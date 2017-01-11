var request = require('request')
var queue = require('queue-async')

var baseUrl = 'https://api.helpscout.net/v1/mailboxes/'
var convos = []
var hsKey = process.env.HelpScoutKey
var mailbox = process.argv[2].toString()
var pageCount = 0
var userMapping = {}

function getData(method, url, cb) {
  var q = queue()
  q.defer(request, {
    method: method,
    url: url,
    auth: {
      username: hsKey,
      password: 'X'
    },
    json: true
  })

  q.awaitAll(function(err, responses) {
    cb(responses)
  })
}


//find total pages for all active conversations
function requestConversationPages(cb) {
    var url = baseUrl + mailbox + '/conversations.json?&status=active'

    getData('GET', url, function(res) { conversationPages(res, cb) })
};

function conversationPages(response, cb) {
  var data = response[0].body
  var pages = data.pages
  requestConversations(pages, cb)
};

function requestConversations(pages, cb){
  for (var i = 1; i <= pages; i++) {
    var page = i;
    var url = baseUrl + mailbox + '/conversations.json?page=' + String(page) + '&status=active'

    getData('GET', url, function(res) { compileConversations(res, cb) })
  }
};

function compileConversations(response, cb) {
  pageCount++;

  var data = response[0].body.items

  data.forEach(function(conversation) {
    convos.push(conversation)
  })
  if (pageCount === response[0].body.pages) {
    console.log('callback')
    cb()
  }
};

function ticketsAssigned() {
  var userTickets = {};
  convos.forEach(function(conversation) {
    if (conversation.owner != null) {
      var ownerId = conversation.owner.id
      var owner = conversation.owner.firstName + ' ' + conversation.owner.lastName
      userMapping[owner] = ownerId
      if  (!userTickets[owner]) userTickets[owner]= 0
        userTickets[owner] += 1
    }
  })
  mostTickets(userTickets)
};

function mostTickets(userTickets) {
  keysSorted = (Object.keys(userTickets).sort(function(a,b){return userTickets[a] - userTickets[b]})).reverse()
  console.log("Assigned tickets: \n")
  for (var i = 0; i < keysSorted.length; i++) {
    var numberOfTickets = userTickets[keysSorted[i]]
    console.log('-' + keysSorted[i] + ' - ' + numberOfTickets + ' ticket' + (numberOfTickets != 1 ? 's':''))
  }
};

requestConversationPages(ticketsAssigned)


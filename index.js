const kafka = require('kafka-node')
const client = new kafka.Client('192.168.99.100:2181', 'kafka-node-client')
const producer = new kafka.Producer(client)
const consumer = new kafka.Consumer(client, ['elasticSearchResult'])

const searchTerm = process.argv[2]

const payloads = [
  { topic: 'userSearchRequest', messages: searchTerm }
]

producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    console.log(data);
  });
});

consumer.on('message', function (message) {
  console.log('Found:', message.value)
  process.exit()
})

producer.on('error', function (err) {})


const kafka = require('kafka-node')
const client = new kafka.Client('192.168.99.100:2181', 'kafka-node-client')
const producer = new kafka.Producer(client)

const topics = ['userSearchRequest', 'elasticSearchQuery', 'elasticSearchResult']

producer.on('ready', () => {


producer.createTopics(topics, false, (err, res) => {
  console.log('topics created', err, res)
  const consumer = new kafka.Consumer(client, 
    topics.map(t => ({ topic: t })))

  consumer.on('message', message => {
    console.log('heard:', message.topic, message.value)
  })
})


})

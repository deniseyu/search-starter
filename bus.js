const kafka = require('kafka-node')

function bus (topic) {
  const client = new kafka.Client('192.168.99.100:2181', 'kafka-node-client')
  const producer = new kafka.Producer(client)
  const consumer = new kafka.Consumer(client, [{ topic }])

  return new Promise((res, rej) => {
    producer.on('ready', () => {
      console.log('producer ready')
      res({producer, consumer})
    })
  })
}

module.exports = bus

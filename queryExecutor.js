const bus = require('./bus')
const request = require('request')

bus('elasticSearchQuery')
  .then(({producer, consumer}) => {
    consumer.on('message', (message) => {
      console.log('search query received:', message)

      const options = {
        uri: 'http://elastic.dev:9200/dis-local/_search',
        body: JSON.parse(message.value),
        json: true,
        method: 'POST'
      }

      request(options, (err, res, body) => {
        const payloads = [{ topic: 'elasticSearchResult', messages: JSON.stringify(body.hits.hits.map(h => h._source.headline)) }]
        console.log('paylod', payloads)
        producer.send(payloads, function (err, data) {
          console.log('error:', err)
          console.log('queryExecutor sent message:', data);
        });
      })
    })
  })

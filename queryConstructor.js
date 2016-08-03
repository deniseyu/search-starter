const bus = require('./bus')

bus('userSearchRequest')
  .then(({producer, consumer}) => {
    consumer.on('message', (message) => {
      const payloads = [
        { topic: 'elasticSearchQuery', messages: createQuery(message.value) }
      ] 
      producer.send(payloads, function (err, data) {
        console.log('sanitiser sent message:', data);
      });
    })
  })

function createQuery (term) {
  const myquery = {
    query_string: {
      query: term
    }
  }
  return JSON.stringify({query: myquery})
}

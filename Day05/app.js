const EventEmitter = require('events');

const myEmitter = new EventEmitter();   

//register an event listener
myEmitter.on('event', (arg) => {
    console.log('An event occurred!', arg);
});
//raise the event
myEmitter.emit('event', { id:1, url : 'https://example.com' });



//Home work

myEmitter.on('massage', (arg) => {  
    console.log('A massage event occurred!', arg);
});

myEmitter.emit('massage', { id:2, text : 'Hello, World!' });
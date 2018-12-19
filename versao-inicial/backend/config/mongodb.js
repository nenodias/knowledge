const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
.catch(err => {
    const msg = 'ERRO! Não foi possível conectar com o mongodb';
    console.log('\x1b[41m%s\x1b[37m', msg, '\x16[0m');
});
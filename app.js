const express = require('express');
const app = express();
const userRouter = require('./routes/users')

const PORT = 8080;

app.use('/users', userRouter);
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
});

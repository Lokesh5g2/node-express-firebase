const express = require("express")
const cors = require("cors")
const Collection = require('./fbconfig')
const { doc } = require("./fbconfig")
const app = express() //starts an express app 
app.use(express.json()) //body parser
app.use(cors()) //allows cross origin requests from one website to another

app.get("/", async (req, res) => {
    const snapshot = await Collection.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.send(list)
})
app.post("/create", async (req, res) => {
    const data = req.body;
    Collection.doc(data.id.toString()).set(data)
    res.status(201).json({ msg: 'user created' })
})
app.put("/update/:id", async (req, res) => {
    const { id } = req.params
    const data = req.body;
    Collection.doc(id.toString()).set(data)
    res.status(201).json({ msg: 'user updated' })
})
app.put("/delete/:id", async (req, res) => {
    const { id } = req.params
    Collection.doc(id.toString()).delete()
    res.status(201).json({ msg: 'user deleted' })
})
app.listen(8080, () => console.log(`server running at localhost:8080`))
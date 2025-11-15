const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const file = "./products.json";

function read() {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}


app.get("/getProducts", (req, res) => {
    res.json(read());
});


app.post("/addProduct", (req, res) => {
    const products = read();
    products.push(req.body);
    write(products);
    res.json({ message: "Product added" });
});


app.delete("/deleteProduct/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let products = read();
    products = products.filter(p => p.productId !== id);
    write(products);
    res.json({ message: "Product deleted" });
});


app.put("/updateProduct/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const products = read();

    const product = products.find(p => p.productId === id);
    if (product) {
        product.description = "Preferred by Both Vegetarians and Non Vegetarians";
        write(products);
    }

    res.json({ message: "Product updated" });
});

app.listen(3000, () => console.log("Server running on port 3000"));

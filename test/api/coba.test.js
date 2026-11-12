import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import schema_createnewuser from "../schema/reqresSchema.js";

describe("API Tests Suite coba", function () {

    it("Get Single User", async function () {
        //tembak url reqres
        const hasil = await fetch(`https://reqres.in/api/users/2`)

        //validasi status code http harus 200
        expect(hasil.status).to.equal(200)

    });


    it("CREATE - Create User Baru", async function () {
        const newPost = {
            name: "morpheus",
            job: "leader"
        }

        //hit
        const hasilpost = await fetch(`https://reqres.in/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "free_user_3JfvvCJDvdwMQieo67jhhiqRiGV"
            },
            body: JSON.stringify(newPost)
        });


        //validasi http status code
        expect(hasilpost.status).to.equal(201);

        //validasi JSON schema
        const ajv = new Ajv()
        const data = await hasilpost.json();
        const cekcek = ajv.compile(schema_createnewuser);
        const hasil = cekcek(data);

        expect(hasil, 'Validasi skema JSON gagal: ' + JSON.stringify(cekcek.errors)).to.be.true;
    })

});
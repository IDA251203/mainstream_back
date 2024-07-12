const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const Products = require("../models/products");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    branding: {
        companyName: "Mainstream"
    },
    databases: [mongoose],
    rootPath: "/admin",
    resources: [
        {
            resource: Products,
            options: {
                parent: {
                    name: "All",
                    icon: "fas fa-request",
                    
                },
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                },
            }
        }
    ]
});

const ADMIN = [
    {
        email: process.env.ADMIN_EMAIL || "mainstream@gmail.com",
        password: process.env.ADMIN_PASSWORD || "1225",
    },
    {
        email: process.env.ADMIN_EMAIL2 || "mainstream2024@gmail.com",
        password: process.env.ADMIN_PASSWORD2 || "2512",
    }
];

const Router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "mainstream",
    cookiePassword: process.env.ADMIN_COOKIE_PASS || "mainstreamm",
    authenticate: async (email, password) => {
        const matchedAdmin = ADMIN.find(admin => admin.email === email && admin.password === password);
        if (matchedAdmin) {
            return matchedAdmin;
        }
        return null;
    },
});

module.exports = Router;

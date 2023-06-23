import path from "path";
import appRoot from "app-root-path";

const rootDir = appRoot.path;

const routes = [
  {
    path: "/",
    method: "get",
    handler: (req, res) => {
      res.json({
        message: "Hello World!",
      });
    },
  },
  {
    path: "/users",
    method: "get",
    handler: (req, res) => {
      res.json({
        message: "List of users",
      });
    },
  },
  {
    path: "/index",
    method: "get",
    handler: (req, res) => {
      const filePath = path.resolve(rootDir, "src/index.html");
      res.sendFile(filePath);
    },
  },
  {
    path: "/api/adduser",
    method: "post",
    handler: (req, res) => {
      const { name, email } = req.body;
      res.status(201).json({
        message: "User created successfully",
        user: {
          name,
          email,
        },
      });
    },
  },
  // Add more routes as needed
];

export { routes };

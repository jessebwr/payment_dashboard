// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Users from "../../src/server/users";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      data: Users.getAllUsers(),
    });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import Cors from "cors";
import initMiddleware from "../../timeUtils/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  const url = "https://api.cryptowat.ch/markets";
  // Run cors
  await cors(req, res);

  // Rest of the API logic
  await axios.get(url).then(({ data }) => {
    res.status(200).json({ data });
  });
}

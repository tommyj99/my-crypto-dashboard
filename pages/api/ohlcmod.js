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
  const coin = req.query.coin;
  const start = req.query.starttime;
  const end = req.query.endtime;
  const period = req.query.period;
  const exchange = req.query.exchange;
  const url = `https://api.cryptowat.ch/markets/${exchange}/${coin}/ohlc?before=${start}&after=${end}&period=${period}&exchange=${exchange}`;
  // Run cors
  await cors(req, res);

  // Rest of the API logic
  await axios.get(url).then(({ data }) => {
    res.status(200).json({ data });
  });
}

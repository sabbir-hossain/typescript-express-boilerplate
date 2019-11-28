// uncomment the following to disable source-map translation of stack traces.
require('source-map-support').install();

import * as express from "express";
// import {IRoute, IRouter} from "express";
import * as helmet from "helmet";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as colors from "colors";
import * as cors from "cors";
import * as util from "util";
import {TYPES} from "./types";
import {container} from "./inversify.config";
import {IComponentRoutes} from "./components/components.routes";
import {config} from "./config";

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: any;
  public passport: any;
  public corsOptions: any;

  /**
   * Bootstrap the application.
   *
   * @method bootstrap
   * @static
   * @return Server
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @constructor
   */
  constructor() {
    /**
     * create expressjs application
     */
    this.app = express();

    /**
     * CORS options
     * @type {{origin: ((origin, next) => any); optionsSuccessStatus: number}}
     */
    this.corsOptions = {
      origin: (origin, next) =>
        config['corsWhiteList'].indexOf('*') !== -1
          ? next(null, '*')
          : config['corsWhiteList'].indexOf(origin) !== -1
          ? next(null, true)
          : next(new Error('Not allowed by CORS')),
      allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type', 'x-access-token'],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      maxAge: 3600
    };

    /**
     * configure application
     */
    this.config();

    /**
     * configure routes
     */
    this.routes();
  }

  /**
   * Configure application
   *
   * @method config
   * @return void
   */
  private config() {
    /**
     * Secure app with helmet
     */
    this.app.use(helmet());

    /**
     * GZIP all assets
     */
    this.app.use(compression());

    /**
     * mount json form parser
     */
    this.app.use(bodyParser.json({limit: '500mb'}));

    /**
     * enable CORS
     */
    this.app.options('*', cors(this.corsOptions));
    this.app.use(cors(this.corsOptions));

    /**
     * mount query string parser
     */
    this.app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

    /**
     * Print Request and Response Time in Console
     */
    this.app.use(function (req, res, next) {
      const start = process.hrtime();

      console.log(colors.cyan('Processing Request %s.'), req.url);
      console.log(colors.magenta(JSON.stringify(req.headers, null, 2)));
      console.log(colors.magenta(JSON.stringify(req.params, null, 2)));
      console.log(colors.magenta(JSON.stringify(req.query, null, 2)));
      console.log(colors.magenta(JSON.stringify(req.body, null, 2)));

      res.once('finish', function () {
        const diff = process.hrtime(start);
        const ms = diff[0] * 1e3 + diff[1] * 1e-6;

        console.log(colors.green('Response time: %d ms for Request URL %s'), ms, req.url);
      });

      next();
    });

    /**
     * catch errors
     */
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
        JSON.parse(err) ? console.dir(JSON.stringify(err)) : console.log(util.inspect(err, {
          showHidden: true,
          depth: null
        }));
      } catch (e) {
        console.error(e);
      }
      err.status ? res.end(err.msg) : next(err);
    });

    this.app.get('/healthCheck', cors(this.corsOptions), function (req, res) {
      res.send(`Server is up for ${process.uptime()}s`);
    });

    /**
     * Init db to create Indexes
     */
    // dbInit();

  }

  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    let componentRoutes: IComponentRoutes = container.get<IComponentRoutes>(TYPES.IComponentRoutes);
    // let router: IRouter<IRoute> = componentRoutes.setupRoutes(this.app);
    let router: any = componentRoutes.setupRoutes(this.app);
    /**
     * Enable Cors & Use Router
     * TODO FIX THIS CORS HACK
     */
    this.app.use(cors(this.corsOptions), router);
  }
}

/**
 * server object by calling bootstrap
 */
const server = Server.bootstrap();

/**
 * Main express server
 */
export const app = server.app;

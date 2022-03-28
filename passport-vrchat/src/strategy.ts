import passport from 'passport-strategy';
import util from 'util';

export interface VerifyCallback {
  (req: Express.Request, done: VerifiedCallback): void;
}

export interface VerifiedCallback {
  (error: any, user?: any, info?: any): void;
}
/**
 * `Strategy` constructor.
 *
 * The custom authentication strategy authenticates requests based on a function callback.
 * Applications must supply a `verify` callback which executes custom authentication logic,
 * and then calls the `done` callback supplying a `user`,
 * which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 */
class Strategy extends passport.Strategy {
  name: string;

  verify: VerifiedCallback;

  constructor(verify?: VerifyCallback) {
    if (!verify) {
      throw new TypeError('CustomStrategy requires a verify callback');
    }
    super();
    this.name = 'custom';
    this.verify = verify;
  }

  /**
    * Authenticate request based on the contents of a form submission.
    * @api protected
    */
  protected authenticate(req:Express.Request, options: any) {
    const self = this;

    function verified(err:Error, user:Express.User, info:any) {
      if (err) {
        return self.error(err);
      }
      if (!user) {
        return self.fail(info);
      }
      self.success(user, info);
    }

    try {
      if (this.verify.length === 3) {
        this.verify(req, options, verified);
      } else {
        this.verify(req, verified);
      }
    } catch (ex) {
      return self.error(ex);
    }
  }
}
export default { Strategy };

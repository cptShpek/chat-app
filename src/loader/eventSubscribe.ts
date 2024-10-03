import { EventEmitterInstance } from "../config/event-emitter";
import {
  forgetPasswordSubscriber,
  signUpSubscriber,
} from "../subscriber/auth.subscriber";

export const eventSubscribe = () => {
  EventEmitterInstance.on("signup", signUpSubscriber);
  EventEmitterInstance.on("forgot", forgetPasswordSubscriber);
};

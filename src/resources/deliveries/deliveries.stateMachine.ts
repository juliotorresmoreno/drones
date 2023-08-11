import { Drone, StatesDrone } from '../../entities/drone.entity';
import { Medication } from '../../entities/medication.entity';

export type Event =
  | 'START'
  | 'LOADING'
  | 'LOADED'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'RETURNING'
  | 'FINISHED';

export class StateMachine {
  private _currentState: StatesDrone = StatesDrone.IDLE;

  get currentState(): StatesDrone {
    return this._currentState;
  }

  transition(event: Event, drone: Drone, medication: Medication) {
    switch (drone.state) {
      case StatesDrone.IDLE:
        if (event === 'LOADING') {
          if (drone.battery < 25) {
            throw new Error('The battery is too low');
          }
          this._currentState = StatesDrone.LOADING;
        }
        break;
      case StatesDrone.LOADING:
        if (event === 'LOADED') {
          this._currentState = StatesDrone.LOADED;
        }
        break;
      case StatesDrone.LOADED:
        if (event === 'DELIVERING') {
          this._currentState = StatesDrone.DELIVERING;
        }
        break;
      case StatesDrone.DELIVERING:
        if (event === 'DELIVERED') {
          this._currentState = StatesDrone.DELIVERED;
        }
        break;
      case StatesDrone.DELIVERED:
        if (event === 'RETURNING') {
          this._currentState = StatesDrone.RETURNING;
        }
        break;
      case StatesDrone.RETURNING:
        if (event === 'FINISHED') {
          this._currentState = StatesDrone.IDLE;
        } else if (event === 'START') {
          this._currentState = StatesDrone.IDLE;
          if (drone.weight < medication.weight) {
            throw new Error('The medicine is too heavy!');
          }
        }
        break;
    }
  }
}

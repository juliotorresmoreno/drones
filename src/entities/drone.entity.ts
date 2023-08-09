import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type ModelDrone =
  | 'Lightweight'
  | 'Middleweight'
  | 'Cruiserweight'
  | 'Heavyweight';
export type StateDrone =
  | 'IDLE'
  | 'LOADING'
  | 'LOADED'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'RETURNING';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  serial_number: string;

  @Column({
    enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'],
  })
  model: ModelDrone;

  @Column()
  weight: number;

  @Column()
  battery: number;

  @Column({
    enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'],
  })
  state: StateDrone;
}

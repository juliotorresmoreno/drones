import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ModelsDrone {
  Lightweight = 'Lightweight',
  Middleweight = 'Middleweight',
  Cruiserweight = 'Cruiserweight',
  Heavyweight = 'Heavyweight'
};

export type ModelDrone = ModelsDrone;

export enum StatesDrone {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING'
};

export type StateDrone = StatesDrone;

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

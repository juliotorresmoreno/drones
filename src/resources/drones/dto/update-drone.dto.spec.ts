import { Drone, ModelsDrone } from '../../../entities/drone.entity';
import { UpdateDroneDtoSchema } from './update-drone.dto';

describe('UpdateDroneDto', () => {
  beforeEach(async () => {});

  it('should be defined', () => {
    expect(UpdateDroneDtoSchema).toBeDefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({} as any);
    expect(error).toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 101,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: -1,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: '90p' as any,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);

    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: 'none' as any,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: 0 as any,
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: -1,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 1001,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be fail', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: '500p' as any,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should UpdateDroneDtoSchema be success', async () => {
    const { error } = UpdateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);

    expect(error).toBeUndefined();
  });
});

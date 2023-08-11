import { Drone, ModelsDrone } from '../../../entities/drone.entity';
import { CreateDroneDtoSchema } from './create-drone.dto';

describe('CreateDroneDto', () => {
  beforeEach(async () => {});

  it('should be defined', () => {
    expect(CreateDroneDtoSchema).toBeDefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({} as any);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 101,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: -1,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: '90p' as any,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);

    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: 'none' as any,
      serial_number: '01234',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '',
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: 0 as any,
      weight: 500,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: -1,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 1001,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be fail', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: '500p' as any,
    } as Drone);
    expect(error).not.toBeUndefined();
  });

  it('should CreateDroneDtoSchema be success', async () => {
    const { error } = CreateDroneDtoSchema.validate({
      battery: 90,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    } as Drone);

    expect(error).toBeUndefined();
  });
});

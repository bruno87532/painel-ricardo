import { IsString, IsNotEmpty, IsDefined, IsBoolean, IsNumber, MinLength, Min, IsArray, ArrayNotEmpty, IsEnum, ArrayUnique, IsOptional, IsDate } from "class-validator"
import { Transform, Type } from "class-transformer"

enum WeekDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

export class CreateSurchargeDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(1)
  propertyId: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(1)
  surchargeTypeId: string

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsDefined()
  amountCents: number

  @IsDefined()
  @Transform(({ value }) => {
    return value === "true" || value === true
  })
  @IsBoolean()
  appliesPerNight: boolean

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(WeekDay, { each: true })
  days: WeekDay[]

  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value)
  })
  @IsDate()
  startDate: Date

  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value)
  })
  @IsDate()
  endDate: Date
}
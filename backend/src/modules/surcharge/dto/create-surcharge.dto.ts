import { IsString, IsNotEmpty, IsDefined, IsBoolean, IsNumber, MinLength, Min, isDefined } from "class-validator"
import { Transform, Type } from "class-transformer"

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
  kind: string

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
}
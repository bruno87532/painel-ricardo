import { IsString, IsNotEmpty, IsDefined, IsBoolean, IsNumber, MinLength, Min, isDefined, IsOptional } from "class-validator"
import { Transform, Type } from "class-transformer"

export class UpdateSurchargeDto {
  @IsOptional()
  @IsString()
  @IsDefined()
  @MinLength(1)
  propertyId: string

  @IsOptional()
  @IsString()
  @IsDefined()
  @MinLength(1)
  kind: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  amountCents: number

  @IsOptional()
  @Transform(({ value }) => {
    return value === "true" || value
  })
  @IsBoolean()
  appliesPerNight: boolean
}
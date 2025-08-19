import { IsString, IsNotEmpty, MinLength, IsDefined } from "class-validator";

export class CreateUpdateSurchargeTypeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsDefined()
  name: string
}
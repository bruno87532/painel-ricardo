import { IsDefined, IsArray, ArrayUnique, ArrayMinSize, MinLength, IsNotEmpty, IsString } from "class-validator"

export class GetSurchargeTypesByIdsDto {
  @IsDefined()
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @MinLength(1, { each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  ids: string[]
}
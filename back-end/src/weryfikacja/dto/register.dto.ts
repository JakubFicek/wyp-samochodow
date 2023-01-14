import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  imie: string;

  @IsString()
  @IsNotEmpty()
  nazwisko: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  haslo: string;

  @IsString()
  @IsNotEmpty()
  pesel: string;

  @IsBoolean()
  @IsNotEmpty()
  czy_jest_prawo_jazdy: boolean;
  
  @IsNumber()
  @IsNotEmpty()
  wiek: number;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export default RegisterDto;
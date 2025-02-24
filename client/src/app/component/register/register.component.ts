import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nationalities= ["afghan","albanian","algerian","american","andorran","angolan","antiguans","argentinean",
  "armenian","australian","austrian","azerbaijani","bahamian","bahraini","bangladeshi","barbadian","barbudans",
  "batswana","belarusian","belgian","belizean","beninese","bhutanese","bolivian","bosnian","brazilian","british",
  "bruneian","bulgarian","burkinabe","burmese","burundian","cambodian","cameroonian","canadian","cape verdean","central african",
  "chilean","chinese","colombian","comoran","congolese","costa rican","croatian","cuban","cypriot","danish","djibouti",
  "dominican", "dutch","east timorese","ecuadorean","egyptian","emirian","equatorial guinean","eritrean","estonian",
  "ethiopian","fijian","filipino","finnish","french","gabonese","gambian","georgian","german","ghanaian","greek","grenadian",
  "guatemalan","guinea-bissauan","guinean","guyanese","haitian","herzegovinian","honduran","hungarian","icelander","indian",
  "indonesian","iranian","iraqi","irish","israeli","italian","ivorian","jamaican","japanese","jordanian","kazakhstani","kenyan",
  "kittian and nevisian","kuwaiti","kyrgyz","laotian","latvian","lebanese","liberian","libyan","liechtensteiner","lithuanian",
  "luxembourger","macedonian","malagasy","malawian","malaysian","maldivan","malian","maltese","marshallese","mauritanian","mauritian",
  "mexican","micronesian","moldovan","monacan","mongolian","moroccan","mosotho","motswana","namibian","nauruan","nepalese",
  "new zealander","ni-vanuatu","nicaraguan","nigerien","north korean","northern irish","norwegian","omani","pakistani",
  "palauan", "panamanian","papua new guinean","paraguayan","peruvian","polish","portuguese","qatari","romanian","russian",
  "rwandan","saint lucian","salvadoran", "samoan", "san marinese", "sao tomean","saudi","scottish","senegalese","serbian",
  "seychellois","sierra leonean", "singaporean","slovakian","slovenian","solomon islander","somali","south african","south korean",
  "spanish","sri lankan","sudanese","surinamer","swazi","swedish","swiss","syrian","taiwanese","tajik","tanzanian","thai",
  "togolese","tongan","trinidadian or tobagonian","tunisian","turkish","tuvaluan","ugandan","ukrainian","uruguayan","uzbekistani",
  "venezuelan","vietnamese","welsh","yemenite","zambian","zimbabwean"];

  form: any = {
    email: null,
    password: null,
    username: null,
    gender: null,
    age: null,
    nationality : 'default',
    contact: null,
    
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email,password,username,gender,age,nationality,contact } = this.form;

    this.authService.register(email,password,username,gender,age,nationality,contact).subscribe(
      data => {
        console.log(data);
        
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}

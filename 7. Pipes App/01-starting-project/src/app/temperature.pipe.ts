import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true,
    pure: false, // disabling optimizing, pipe will be rerun always
})
export class TemperaturePipe implements PipeTransform{
    // transform(value: any, ...args: any[]){ // value: any - argument on which pipe is used, args - configuration
    //     return value + ' - transformed'
    // }

    transform(value: string | number | null, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah'){ // value: any - argument on which pipe is used, args - configuration
        let val: number;

        if(!value){
            return value;
        }
        if(typeof value === 'string'){
            val = parseFloat(value);
        } else {
            val = value;
        }

        let outputTemp: number;

        if(inputType === 'cel' && outputType === 'fah'){
            outputTemp = val * (9/5) + 32;
        } else if(inputType === 'fah'){
            outputTemp = (val-32) * (5/9);
        }
        else {
            outputTemp = val;
        }

        let symbol: 'C' | 'F';

        if (!outputType){
            symbol = inputType === 'cel' ? 'C' : 'F';
        } else {
            symbol = outputType === 'cel' ? 'C' : 'F';
        }
        
        return `${outputTemp.toFixed(2)} ${symbol}`
    }
}
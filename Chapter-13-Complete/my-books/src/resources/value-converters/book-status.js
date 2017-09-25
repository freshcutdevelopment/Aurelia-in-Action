export class BookStatusValueConverter{
    toView(value) {

        switch(value){
            case 'bad':
                return 'fa-frown-o';
            case 'good':
                return 'fa-smile-o';
            case 'ok':
                return 'fa-meh-o';
        }
    
    }
}
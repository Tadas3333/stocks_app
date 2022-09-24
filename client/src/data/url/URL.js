import Util from 'util/Util'

export default class URL {
    static NO_ARG = "NONE";

    static prepareURL(functionName, args=null) {
        if(Util.isNull(args)) {
            return "/" + functionName + "?arg=@@@@";
        } else {
            return "/" + functionName + "?arg=" + args;
        }
    }
}
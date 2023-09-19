class PageState{
    #state;
    #pending;
    #type;
    #data;
    constructor(){
        this.restoreDefaultState()
    }
    
    getState(){return this.#state;}
    getPending(){return this.#pending;}
    getType(){return this.#type;}
    getData(){return this.#data;}

    setState(state){
        this.#state = state;
        this.#pending = state.pending;
        this.#type = state.type;
        this.#data = state.data;
    }
    
    restoreDefaultState(){
        this.setState({pending:false,type:null,data:{}});
    }
}

export default PageState;
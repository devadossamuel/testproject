const molecule={template:`
<div>
<div class="d-flex justify-content-start">
<input class="form-control m-2 w-25"
    v-model="MoleculeIdFilter"
    v-on:keyup.enter="filterMolecule()"
    v-on:keyup="refreshForEmptyFilter()"
    placeholder="Molecule  ID">
    <button type="button" class="btn btn-light"
        @click="filterMolecule()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
</button>
</div>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Molecule ID
        </th>
        <th>
            Molecule Name
        </th>
        <th>
            Molecule Structure
        </th>
        <th>
            Molecule Image
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="mol in molecules">
        <td>{{mol.id}}</td>
        <td>{{mol.name}}</td>
        <td id="item1">{{mol.structure}}</td>
        <td>
                <input
                class="btn btn-light btn-outline-primary"
                value="show"
                onclick="showMoleculeImage()"
                type="button"/>
        </td>
    </tr>
</tbody>
</table>
<button class="btn btn-light btn-outline-primary" v-on:click = "previousMolecules()">Previous</button>
<button class="btn btn-light btn-outline-primary" v-on:click = "nextMolecules()">Next</button>
</div>

`,

data(){
    return{
        molecules:[],
        moleculeIdFilter:"",
        nextUrl:"",
        previousUrl:""
    }
},
methods:{
    showMolecule(mstructure) {
    alert(mstructure);
    },
    refreshForEmptyFilter() {
        var MoleculeId=this.MoleculeIdFilter;
        if (MoleculeId.length <= 0) {
            this.refreshData()
        }
    },
    previousMolecules() {
        if( this.previousUrl === null || this.previousUrl.length <=0) {
            alert("You are already in the first page");
            return;
        }
        this.updateMolecule(this.previousUrl) },
    nextMolecules() {  this.updateMolecule(this.nextUrl)    },
    updateMolecule(url) {
        var MoleculeId=this.MoleculeIdFilter;
        try {
        axios.get(url)
        .then((response)=>{
            console.log("Status:"+response.status);
            this.molecules=response.data.results;
            this.nextUrl = response.data.next;
            this.previousUrl = response.data.previous;
        }).catch(function (error) {
            alert("Sorry, No Molecule found for ID: "+MoleculeId);
        });
        } catch(err) {
            console.log('Error', "Something went wrong for ID: "+MoleculeId);
        }
    },
    refreshData(){
        var url = variables.API_URL+"molecule";
        this.updateMolecule(url);
    },
    filterMolecule(){
        var MoleculeId=this.MoleculeIdFilter;
        if(/^\d+$/.test(MoleculeId) == false) {
            alert ("Invalid type: Molecule id");
            return;
        }
        var url = variables.API_URL+"molecule/"+MoleculeId;
        try {
        axios.get(url)
        .then((response)=>{
        if(response.status == 200)
            this.molecules=[response.data];
         else
            this.molecules = [];
        }).catch(function (error) {
            this.molecules = [];
            alert("Sorry, No Molecule found for ID: "+MoleculeId);
        }); }
        catch(err) {
            alert("Sorry, No Molecule found for ID: "+MoleculeId);
            console.log('Error', "Something went wrong for ID: "+MoleculeId);
            this.molecules = [];
        }
    },
},
mounted:function(){
    this.refreshData();
}

}
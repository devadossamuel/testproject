const activity={template:`
<div>
            <div class="d-flex justify-content-start">
                <input class="form-control m-2 w-25"
                    v-model="ActivityIdFilter"
                    v-on:keyup.enter="fetchMolecules()"
                    v-on:keyup="refreshForEmptyFilter()"
                    placeholder="Molecule ID">
                    <button type="button" class="btn btn-light"
                        @click="fetchMolecules()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            Molecule Id
        </th>
        <th>
            Activity Id
        </th>
        <th>
            Activity Type
        </th>
            <th>
            Target Name
        </th>
            <th>
            Module Name
        </th>
            <th>
            Organism
        </th>
        <th style="display:none" class=".d-none">
            Hidden
        </th>
        <th>
            Show
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="act in activities">
        <td>{{act.molecule_id}}</td>
        <td>{{act.id}}</td>
        <td>{{act.type}}</td>
        <td>{{act.target_name}}</td>
        <td>{{act.molecule_name}}</td>
        <td>{{act.target_organism}}</td>
        <td style="display:none" class=".d-none" id="item1">{{act.molecule_structure}}</td>
        <td>
            <input class="btn btn-light btn-outline-primary"
            value="show"
            onclick="showMoleculeImage()"
            type="button"/>
        </td>
    </tr>
</tbody>
</thead>
</table>
<button class="btn btn-light btn-outline-primary" v-on:click = "PreviousActivities()">Previous</button>
<button class="btn btn-light btn-outline-primary" v-on:click = "NextActivities()">Next</button>
</div>

`,
data(){
    return{
        activities:[],
        ActivityIdFilter:"",
        nextUrl:"",
        previousUrl:""
    }
},
methods:{
        refreshData(){
        var url = variables.API_URL+"activity";
        this.updateActivities(url);
    },
    refreshForEmptyFilter() {
        var MoleculeId=this.ActivityIdFilter;
        if (MoleculeId.length <= 0) {
            this.refreshData()
        }
    },
    PreviousActivities() {
        if( this.previousUrl === null ||  this.previousUrl.length <=0) {
        alert("You are the first page");
        return;
        }
        this.updateActivities(this.previousUrl);
        },
    NextActivities() {
        this.updateActivities(this.nextUrl);
    },
    updateActivities(url) {
        axios.get(url)
            .then((response) => {
                console.log("Status:"+response.status);
                this.activities = response.data.results;
                this.nextUrl = response.data.next;
                this.previousUrl = response.data.previous;
            })
            .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                 console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
             } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
    });
    },
     fetchMolecules(){
        var MoleculeId=this.ActivityIdFilter
        if(/^\d+$/.test(MoleculeId) == false) {
            alert ("Invalid type: Activity id");
            return;
        }
        var url = variables.API_URL+"activitydetail/"+MoleculeId+"/";
        this.updateActivities(url);
        }
    },
mounted:function(){
    this.refreshData();
    }
}


function showimage(smiles){
var mol = RDKitModule.get_mol(smiles);
var canvas = document.getElementById("canvas-2");
mol.draw_to_canvas(canvas, -1, -1);
}

function showMoleculeImage() {
  var x = document.activeElement.parentElement.previousElementSibling.innerHTML;
  showimage(x);
}

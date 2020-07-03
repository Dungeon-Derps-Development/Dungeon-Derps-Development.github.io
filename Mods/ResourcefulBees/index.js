window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'Changes you made may not be saved.';

    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
});

var beeTraits = []

function addTrait() {
    var traitDex = document.getElementById("traits");
    var trait = traitDex.options[traitDex.selectedIndex].value;
    var traitDisplay = traitDex.options[traitDex.selectedIndex].text;
    if (trait !=="none") {
        if (!beeTraits.includes(trait)) {
            var node = document.createElement("div");
            node.classList.add("trait");
            node.classList.add(trait);
            node.innerHTML = `
            <img src="./assets/${trait}.png">
            <p>${traitDisplay}</p>
            <button onclick="removeTrait(this)"></button>
            `
            beeTraits.push(trait);
            document.getElementsByClassName("grid-container-traits")[0].appendChild(node);
            document.getElementById("traits").value = "none";
        }
    }
}

function enableColors() {
    var primaryColor = document.getElementById("color-primary")
    var secondaryColor = document.getElementById("color-secondary")
    var primaryColorText = document.getElementById("color-text-primary")
    var secondaryColorText = document.getElementById("color-text-secondary")
    primaryColor.toggleAttribute("disabled")
    secondaryColor.toggleAttribute("disabled")
    primaryColorText.toggleAttribute("disabled")
    secondaryColorText.toggleAttribute("disabled")
}

function enableBreeding() {
    var breedChance = document.getElementById("breeding-chance")
    var parent1 = document.getElementById("parent1")
    var parent2 = document.getElementById("parent2")
    breedChance.toggleAttribute("disabled")
    parent1.toggleAttribute("disabled")
    parent2.toggleAttribute("disabled")
}

function enableSpawning() {
    var biomeList = document.getElementById("biome-whitelist")
    var biomeList2 = document.getElementById("biome-blacklist")
    biomeList.toggleAttribute("disabled")
    biomeList2.toggleAttribute("disabled")
}

function colorPickerChange(picker, color_text) {
    var colorTextBox = document.getElementById(color_text)
    colorTextBox.value = picker.value;
}

function colorTextChange(text, colorPick) {
    var colorPicker = document.getElementById(colorPick)
    if (text.value !== "") {
        if (text.value.startsWith("#")){
            colorPicker.value = text.value
        }
    }
}

function writeJson() {
    var name = document.getElementById("name")
    var flower = document.getElementById("flower")

    /** Centrifuge **/
    var mainCentrifuge = document.getElementById("main-output")
    var mainCentrifugeWeight = document.getElementById("main-output-chance")
    var secondCentrifuge = document.getElementById("second-output")
    var secondCentrifugeWeight = document.getElementById("second-output-chance")
    var bottleCentrifuge = document.getElementById("bottle-output")
    var bottleCentrifugeWeight = document.getElementById("bottle-output-chance")

    /** Breeding **/
    var breedable = document.getElementById("breedable")
    var parent1 = document.getElementById("parent1")
    var parent2 = document.getElementById("parent2")
    var breedWeighting = document.getElementById("breeding-chance")

    /** Coloring **/
    var beeColored = document.getElementById("beeColored")
    var color = document.getElementById("color-honeycomb")
    var colorPrimary = document.getElementById("color-primary")
    var colorSecondary = document.getElementById("color-secondary")

    /** World **/
    var spawnsInWorld = document.getElementById("spawnInWorld")
    var biomeList = document.getElementById("biome-whitelist")
    var biomeList2 = document.getElementById("biome-blacklist")
    var timeInHive = document.getElementById("hive-time")
    var minTimeInHive = document.getElementById("min-hive-time")
    var baseBlock = document.getElementById("base-block")
    var mutationBlock = document.getElementById("mutation-block")
    var sizeMod = document.getElementById("size-mod")

    /** Texturing **/
    var baseTexture = document.getElementById("base-texture")
    var secondTexture = document.getElementById("secondary-texture")
    var primeTexture = document.getElementById("primary-texture")


    if (name.value !== "" && color.value !== "" && flower.value !== "" && mainCentrifuge.value !== "") {
        var obj = new Object();
        obj.honeycombColor  = color.value;
        obj.flower = flower.value;
        obj.mainOutput = mainCentrifuge.value;
        obj.mainOutputWeight = mainCentrifugeWeight.value;
        obj.secondaryOutputWeight = secondCentrifugeWeight.value;
        obj.bottleOutputWeight = bottleCentrifugeWeight.value;
        obj.maxTimeInHive = timeInHive.value;
        obj.minTimeInHive = minTimeInHive.value;
        obj.isBeeColored = beeColored.checked;
        obj.sizeModifier = sizeMod.value;


        if (secondCentrifuge.value !== "") {obj.secondaryOutput = secondCentrifuge.value;}
        if (bottleCentrifuge.value !== "") {obj.bottleOutput = bottleCentrifuge.value;}

        if (baseTexture.value !== "") {obj.baseLayerTexture = baseTexture.value;}
        if (primeTexture.value !== "") {obj.primaryLayerTexture = primeTexture.value;}
        if (secondTexture.value !== "") {obj.secondaryLayerTexture = secondTexture.value;}

        if (beeColored.checked && colorPrimary.value !== "" && colorSecondary.value !== ""){
            obj.primaryColor = colorPrimary.value;
            obj.secondaryColor  = colorSecondary.value;
        }
        if (breedable.checked) {
            obj.breedable = true;
            obj.parent1 = parent1.value;
            obj.parent2 = parent2.value;
            obj.breedWeight = breedWeighting.value;
        }
        if (spawnsInWorld.checked) {
            obj.spawnInWorld = true;
            obj.biomeWhitelist = biomeList.value;
            obj.biomeBlacklist = biomeList2.value;
        }
        if (baseBlock.value !== "" && mutationBlock.value !== "") {
            obj.mutationInput = baseBlock.value;
            obj.mutationOutput = mutationBlock.value;
        }
        if (beeTraits.length > 0) {
            beeTraits.forEach(element => {
                obj[element+"Bee"] = true;
            })
        }
        var jsonString= JSON.stringify(obj);
        download(`${name.value}.json`, jsonString)
    }
}

function removeTrait(traitNode) {
    var traitName = traitNode.parentNode.classList[1]
    beeTraits.splice(beeTraits.indexOf(traitName), 1)
    traitNode.parentNode.remove()
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function clearEditor() {
    document.getElementById("name").value ="";
    document.getElementById("flower").value ="";

    /** Centrifuge **/
    document.getElementById("main-output").value =""
    document.getElementById("main-output-chance").value = document.getElementById("main-output-chance").defaultValue;
    document.getElementById("second-output").value =""
    document.getElementById("second-output-chance").value = document.getElementById("second-output-chance").defaultValue;
    document.getElementById("bottle-output").value =""
    document.getElementById("bottle-output-chance").value = document.getElementById("bottle-output-chance").defaultValue;

    /** Breeding **/
    document.getElementById("breedable").checked = false;
    document.getElementById("parent1").value =""
    document.getElementById("parent2").value =""
    document.getElementById("parent1").setAttribute("disabled", true)
    document.getElementById("parent2").setAttribute("disabled", true)
    document.getElementById("breeding-chance").setAttribute("disabled", true)
    document.getElementById("breeding-chance").value = document.getElementById("breeding-chance").defaultValue;

    /** Coloring **/
    document.getElementById("beeColored").checked = true;
    document.getElementById("color-honeycomb").value =document.getElementById("color-honeycomb").defaultValue;
    document.getElementById("color-primary").value =document.getElementById("color-primary").defaultValue;
    document.getElementById("color-secondary").value =document.getElementById("color-secondary").defaultValue;
    document.getElementById("color-text-honeycomb").value =""
    document.getElementById("color-text-primary").value =""
    document.getElementById("color-text-secondary").value =""

    /** World **/
    document.getElementById("spawnInWorld").checked = false;
    document.getElementById("biome-whitelist").value =""
    document.getElementById("biome-blacklist").value =""
    document.getElementById("biome-list").setAttribute("disabled", true)
    document.getElementById("hive-time").value = document.getElementById("hive-time").defaultValue;
    document.getElementById("base-block").value =""
    document.getElementById("mutation-block").value =""
    document.getElementById("size-mod").value = document.getElementById("size-mod").defaultValue;

    /** Texturing **/
    document.getElementById("base-texture").value =""
    document.getElementById("secondary-texture").value =""
    document.getElementById("primary-texture").value =""

    beeTraits = []
    document.getElementsByClassName("grid-container-traits")[0].childNodes.forEach(element => {
        element.remove()
    })
}

$(document).ready(function () {
    $("#Bbuscar").click(function (e) {
        e.preventDefault();
        var nombrePokemon = $("#Buscar").val().toLowerCase();
        if (nombrePokemon) {
            buscarPokemon(nombrePokemon);
        }
    });

    $("#Blimpiar").click(function (e) {
        e.preventDefault();
        $("#Contenedor-pokemon").empty();
        $("#Buscar").val('');
    });

    function buscarPokemon(pokemon) {
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
            datatype: "json",
            success: function (data) {
                renderPokeData(data)
            }
        });
    }

    function renderPokeData(data) {
        let div = $("<div></div>");
        div.addClass("poke card");

        let name = $("<h3></h3>");
        name.addClass("card-title");
        name.append(data.id + " " + data.name.toUpperCase());
        div.append(name);

        let img = $("<img></img>");
        img.attr("src", data.sprites.other["official-artwork"].front_default);
        img.addClass("card-img");
        div.append(img);

        let body = $("<div></div>")
        body.addClass("card-body");

        var pokeType = data.types;
        var tipos = '';
        pokeType.forEach(function (type) {
            if (pokeType.lenght > 1 && !pokeType.lenght.last) {
                tipos += `${type['type']['name']} - `.toUpperCase();
            } else {
                tipos += `${type['type']['name']}`.toUpperCase();
            }
        })
        body.append(`<div>Tipo ${tipos}</div>`);
        div.append(body);

        $('#Contenedor-pokemon').append(div);
    }
})
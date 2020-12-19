(function() {
    var exercises = [
        { name: 'Slingshot', id: 'slingshot' },
    ];


    for (var i = 0; i < exercises.length; i += 1) {
        var slingshot = exercises[i];
        slingshot.init = window.Example['slingshot'];
    }

    var proyecto = MatterTools.Demo.create({
        toolbar: {
            title: 'Proyecto final Física',
            url: '#',
            reset: true,
            source: false,
            inspector: false,
            tools: false,
            fullscreen: true,
            exampleSelect: false
        },
        tools: {
            inspector: false,
            gui: false
        },
        inline: false,
        preventZoom: true,
        resetOnOrientation: true,
        routing: true,
        startExample: 'mixed',
        examples: exercises
    });

    window.MatterDemo = proyecto;

    document.body.appendChild(proyecto.dom.root);

    MatterTools.Demo.start(proyecto);
})();

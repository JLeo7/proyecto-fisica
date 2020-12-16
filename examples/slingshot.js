var Example = Example || {};

let cuadros = [];

let messageShown = false;

Example.slingshot = function () {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1920,
            height: 1080,
            showAngleIndicator: true,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
        rockOptions = {
            density: 0.004, render: {
                sprite: {
                    xScale: 0.5,
                    yScale: 0.5,
                    texture: './img/ball.png',
                }
            }
        },
        rock = Bodies.polygon(170, 450, 50, 20, rockOptions),
        anchor = { x: 170, y: 450 },
        elastic = Constraint.create({
            pointA: anchor,
            bodyB: rock,
            stiffness: 0.05
        });


    var ground2 = Bodies.rectangle(560, 400, 250, 30, { isStatic: true });

    var pyramid2 = Composites.pyramid(450, 0, 9, 9, 0, 0, function (x, y) {
        let rectangle = Bodies.rectangle(x, y, 25, 40);
        cuadros.push(rectangle);
        return rectangle;
    });

    World.add(engine.world, [ground, ground2, pyramid2, rock, elastic]);

    Events.on(engine, 'afterUpdate', function () {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
            rock = Bodies.polygon(170, 450, 50, 20, rockOptions);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
        }
        let cantDown = 0;
        cuadros.forEach(value => {
            if(value.position.y > 400){
                cantDown++;
            }
        })
        if(cantDown == 25){
            if(!messageShown){
                messageShown = true;
                alert('Ganaste!');
            }
            location.reload();
        }

    });

    Events.on(pyramid2, 'collision', function() {

    })


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function () {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}

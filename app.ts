type DirectionNames = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
const directionOrder: DirectionNames[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

class Robot {
    private currentDirectionIndex: number;
    private currentX: number;
    private currentY: number;
    private advanceValues: { [key in DirectionNames]?: [number, number] } = {
        NORTH: [0, 1],
        EAST: [1, 0],
        SOUTH: [0, -1],
        WEST: [-1, 0],
    }

    setupDirection(direction: DirectionNames) {
        this.currentDirectionIndex = directionOrder.indexOf(direction);
    }

    turn(dir: 1 | -1) {
        if (dir === 1) {
            this.currentDirectionIndex = this.currentDirectionIndex !== directionOrder.length - 1 ?
                this.currentDirectionIndex + 1 : 0;
        } else if (dir === -1) {
            this.currentDirectionIndex = this.currentDirectionIndex !== 0 ?
                this.currentDirectionIndex - 1 : directionOrder.length - 1;
        }
    }

    advance() {
        const [xIncr, yIncr] = this.advanceValues[directionOrder[this.currentDirectionIndex]];
        this.currentX += xIncr;
        this.currentY += yIncr;
    }

    execute(argument: string):string {
        const [initX, initY, initBearing, commands] = argument.split(' ');
        this.currentX = parseInt(initX);
        this.currentY = parseInt(initY);
        this.setupDirection(initBearing as DirectionNames);

        commands.split('').forEach((command) => {
            switch(command) {
                case 'A':
                    this.advance();
                    break;
                case 'L':
                    this.turn(-1);
                    break;
                case 'R':
                    this.turn(1);
            }
        });

        return `${this.currentX} ${this.currentY} ${directionOrder[this.currentDirectionIndex]}`;
    }
}

const command = process.argv[2];
const commandTest = /^\d+ \d+ (NORTH|EAST|SOUTH|WEST) [ARL]+$/;
if (!commandTest.test(command)) {
    throw 'Bad command format';
}

const robot = new Robot();

console.log(robot.execute(command));

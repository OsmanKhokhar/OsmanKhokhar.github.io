<?php 

interface Shape{
    public function draw();
}

class Circle implements Shape{

    public function draw()
    {
        echo "Drawing a circle\n";
    }
}
class Rectangle implements Shape{

    public function draw()
    {
        echo "Drawing a rectangle\n";
    }
}
class Square implements Shape{

    public function draw()
    {
        echo "Drawing a square\n";
    }
}
class shapeFactory{

    public function getShape($shapeType){
        switch(strtolower($shapeType)) {
            case "circle":
                return new Circle();
            case "rectangle":
                return new Rectangle();
            case "square":
                return new Square();
            default: 
            return null;
        }
    }
}

$shape = new shapeFactory();
$shape1 = $shape->getShape("circle");
$shape1->draw();

$shape2 = $shape->getShape("rectangle");
$shape2->draw();

$shape3 = $shape->getShape("square");
$shape3->draw();
?>
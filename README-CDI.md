# CDI
El cdi tiene la capacidad de generar uno o una serie de formularios que pueden o no estar anidados entre si y que pueden ser generados de manera dinámica desde base de datos y se reflejaran en el proyecto móvil de flutter llamado finance_app.

## CREAR NUEVOS COMPONENTES EN BASE DE DATOS
  Aquí se definen las distintas formas de configurar componentes en base de datos para la tabla COMPONENTE; 
  campos obligatorios sobre cualquier componente

  ```
    placeholder

    type = define que tipo de componente sera vinculado en la tabla TIPO_COMPONENTE,
    
    columnNumber = define la posición en la que se mostrara en el formulario

    show = define si el componente se muestra o no, esto es esencialmente util cuando necesitamos vincular un valor al request de la solicitud pero no queremos que el cliente lo vea, 

    bodyKey = usada para manejar en las peticiones, GET, POS, PUT, DELETE, PATCH

    Id_icon = Colocara un icono al lado izquierdo del componente en la UI,

  ```

### QTS_Input
    Componente que renderiza una caja de texto la cual puede ser de tipo string o numero

    ```
    Estructura BD: {
        hintText = string que se mostrara en la caja de texto como recomendación
        showInList = mostrara el valor en la tabla previa al formulario
        inputType = valor que representara la request y también sirve para discernir el tipo de teclado.
    }
    
    ```

### QTS_CheckButton
    componente que sirve para marcar o desmarcar una opción solo lleva los campos básicos.


### QTS_Dropdown
  Descripción: Lista desplegable que acepta una url de otro servicio ej: orders/v1/departments
  
  ```
  Estructura BD: {
      listKeys = Estructura json que debe tener en formato string  {"key1": "ID_VALUE1", "key2": "ID_VALUE2"} 
      url = URL del servicio a usar
      hintText
  }
  ```

### QTS_TwoCascadeDropdown
  Descripción: Lista desplegable que despliega otra lista desplegable según el ID del dropdown_padre seleccionado en UI. para usarlo es necesario definir dos dropdowns con el tipo QTS_TwoCascadeDropdown uno debe de ser padre y el otro hijo(se definen el listKeys). es importante recalcar que la url del servicio debe de ser un tipo get y también debe de devolver una lista de objetos planos que incluyan como mínimo la key1 y la key2 que se definirá en listKeys

  ```
    Estructura BD: {
      listKeys = Estructura json que debe tener en formato string  {
                    "id": "1", //Este es usado en UI no usar el mismo dos veces!
                    "level": "children" | "father" // define quien sera el dropdown que se despliegue primero.
                    "key1": "Id_municipio", // llave que se necesita se guarde en base de datos cuando se envié como request
                    "key2": "Nombre_municipio" //Valor a mostrar 
                    }
      url = URL del servicio a usar                    
      hintText
      type = QTS_TwoCascadeDropdown,
      columnNumber = define la posición en la que se mostrara en el formulario
      show = define si el componente se muestra o no, esto es esencialmente util cuando necesitamos vincular un valor al request de la solicitud pero no queremos que el cliente lo vea, 
  } 
```

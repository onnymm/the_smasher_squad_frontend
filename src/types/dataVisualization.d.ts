// Tipos de dato genéricos para renderizar en vistas de datos
type WidgetComponent = 'char' | 'badge' | 'monetary' | 'datetime' | 'date' | 'time' | 'many2one' | 'float' | 'percentage' | 'check' | 'integer';

// Valor genérico
type DataValue = string | number | boolean | null;

// Función de validación de valor
type ValidationCallback<T extends DataValue> = (value: T) => boolean;

// Interfaz de funciones de validación
interface ValidationOptions {
    info?: ValidationCallback;
    success?: ValidationCallback;
    warning?: ValidationCallback;
    danger?: ValidationCallback;
}

type TableCustomComponent<T extends { [key: string]: DataValue }> = (config: T) => React.JSX.Element;

// Interfaz de configuración de vista de datos
interface ViewConfig extends SelectableOption<string> {
    kanban?: 'title'| 'description' | 'check' | 'fixed' | 'details' | 'none';
    kanbanDisplayName?: boolean;
    canSort?: boolean;
    toggleable?: boolean;
    tableHide?: boolean;
    tableVisible?: boolean;
    type?: WidgetComponent | ((config: any) => (React.JSX.Element | null));
    options?: ValidationOptions;
}

// Registro recibido desde el backend
type DataRecord = {
    [ key: string ]: DataValue;
};

// Información de tipo de dato
interface DataField {
    name: string;
    ttype: WidgetComponent;
};

// Estructura de datos recibida desde el backend
interface ResponseDataStructure {
    data: DataRecord[];
    count: number;
    fields: DataField[];
};

// Interfaz de función de solicitud de datos al backend
type GenericDataViewAPICallback = (
    params: object,
    setState: React.Dispatch<React.SetStateAction<DataViewData | undefined>>,
) => (void)

// Filtro seleccionable para vista de datos
interface DataFilter extends SelectableOption<number> {
    criteria: string;
}

// Interfaz de filtros
interface DataViewFilters {
    default: {
        criteria: string;
    };
    available: DataFilter[]
}

// Interfaz de anchos de columna de tabla
interface ColumnWidths {
    [ key: string ]: number | null
};

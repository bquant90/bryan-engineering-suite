export interface BoxDimensions {
  length: number;
  width: number;
  height: number;
}

export interface DimensionDisplay {
  length: number;
  width: number;
  height: number;
  length_ft: string;
  width_ft: string;
  height_ft: string;
}

export interface BasicCalculations {
  surface_area_sqin: number;
  surface_area_sqft: number;
  volume_cuin: number;
  volume_cuft: number;
  volume_liters: number;
}

export interface GeometryInfo {
  perimeter_base: number;
  diagonal: number;
}

export interface PracticalInfo {
  paint_needed_oz: number;
  cardboard_sheets: number;
  weight_estimates: {
    cardboard: number;
    wood: number;
    steel: number;
    plastic: number;
  };
}

export interface BoxCalculationResult {
  dimensions: DimensionDisplay;
  basic_calculations: BasicCalculations;
  geometry: GeometryInfo;
  practical: PracticalInfo;
  comparisons: string;
}

export interface APIResponse {
  success: boolean;
  data?: BoxCalculationResult;
  error?: string;
}

export interface MaterialCostRequest {
  surface_area: number;
  material: string;
}

export interface MaterialCostResult {
  material: string;
  surface_area_sqft: number;
  estimated_cost: number;
}

export interface CalculatorInfo {
  name: string;
  description: string;
  inputs: string[];
  units?: string;
  features?: string[];
  materials?: string[];
}

// Planet Calculator Types
export interface WeightRequest {
  weight: number;
}

export interface PlanetWeight {
  planet_id: number;
  name: string;
  weight_on_planet: number;
  multiplier: number;
  display_name: string;
}

export interface PlanetWeightResult {
  earth_weight: number;
  planet_weights: PlanetWeight[];
}

export interface PlanetAPIResponse {
  success: boolean;
  data?: PlanetWeightResult;
  error?: string;
}
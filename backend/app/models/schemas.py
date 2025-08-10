"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field
from typing import Dict, Optional

class BoxDimensions(BaseModel):
    """Input model for box dimensions"""
    length: float = Field(..., gt=0, le=1000, description="Length in inches")
    width: float = Field(..., gt=0, le=1000, description="Width in inches") 
    height: float = Field(..., gt=0, le=1000, description="Height in inches")

class DimensionDisplay(BaseModel):
    """Model for dimension display in different units"""
    length: float
    width: float
    height: float
    length_ft: str
    width_ft: str
    height_ft: str

class BasicCalculations(BaseModel):
    """Model for basic calculation results"""
    surface_area_sqin: float
    surface_area_sqft: float
    volume_cuin: float
    volume_cuft: float
    volume_liters: float

class GeometryInfo(BaseModel):
    """Model for additional geometry information"""
    perimeter_base: float
    diagonal: float

class PracticalInfo(BaseModel):
    """Model for practical application data"""
    paint_needed_oz: float
    cardboard_sheets: float
    weight_estimates: Dict[str, float]

class BoxCalculationResult(BaseModel):
    """Complete box calculation response model"""
    dimensions: DimensionDisplay
    basic_calculations: BasicCalculations
    geometry: GeometryInfo
    practical: PracticalInfo
    comparisons: str

class APIResponse(BaseModel):
    """Standard API response wrapper"""
    success: bool
    data: Optional[BoxCalculationResult] = None
    error: Optional[str] = None

class MaterialCostRequest(BaseModel):
    """Request model for material cost calculation"""
    surface_area: float = Field(..., gt=0, description="Surface area in square inches")
    material: str = Field("cardboard", description="Material type")

class MaterialCostResult(BaseModel):
    """Response model for material cost calculation"""
    material: str
    surface_area_sqft: float
    estimated_cost: float

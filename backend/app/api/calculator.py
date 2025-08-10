# app/api/calculator.py
"""
API routes for calculator endpoints
"""
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    BoxDimensions, APIResponse, MaterialCostRequest, 
    MaterialCostResult
)
from app.services.calculator_service import CalculatorService, get_material_options

router = APIRouter()

@router.post("/box-calculator", response_model=APIResponse)
async def calculate_box(dimensions: BoxDimensions):
    """
    Calculate box properties including surface area, volume, and practical applications
    
    - **length**: Box length in inches (0.01 to 1000)
    - **width**: Box width in inches (0.01 to 1000)  
    - **height**: Box height in inches (0.01 to 1000)
    
    Returns comprehensive box calculations and practical information.
    """
    try:
        result = CalculatorService.calculate_box_properties(dimensions)
        return APIResponse(success=True, data=result)
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Calculation error: {str(e)}")

@router.post("/material-cost", response_model=MaterialCostResult)
async def calculate_material_cost(request: MaterialCostRequest):
    """
    Calculate estimated material costs for a given surface area
    
    - **surface_area**: Surface area in square inches
    - **material**: Material type (cardboard, plywood, plastic, metal, acrylic)
    
    Returns cost estimation based on material type.
    """
    try:
        result = CalculatorService.calculate_material_cost(
            request.surface_area, 
            request.material
        )
        return result
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Cost calculation error: {str(e)}")

@router.get("/materials")
async def get_materials():
    """
    Get available material options with descriptions
    """
    return {
        "success": True,
        "data": get_material_options()
    }

@router.get("/calculator-info")
async def get_calculator_info():
    """
    Get information about available calculators
    """
    return {
        "success": True,
        "data": {
            "box_calculator": {
                "name": "3D Box Calculator",
                "description": "Calculate surface area, volume, and practical applications for 3D boxes",
                "inputs": ["length", "width", "height"],
                "units": "inches",
                "features": [
                    "Surface area and volume calculations",
                    "Multiple unit conversions", 
                    "Paint and material estimates",
                    "Weight estimates for different materials",
                    "Size comparisons"
                ]
            },
            "material_cost": {
                "name": "Material Cost Estimator", 
                "description": "Estimate material costs based on surface area",
                "inputs": ["surface_area", "material_type"],
                "materials": list(get_material_options().keys())
            }
        }
    }

@router.get("/health")
async def api_health_check():
    """
    API health check endpoint
    """
    return {"status": "healthy"}
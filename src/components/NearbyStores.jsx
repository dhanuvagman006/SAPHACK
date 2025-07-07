import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Button,
  Divider,
  Rating,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { Store, TrendingUp, MapPin, Star, ShoppingBag, Calendar } from 'lucide-react'

// Mock data for nearby distributors and wholesalers
const nearbyDistributors = [
  {
    id: 1,
    name: "Metro Cash & Carry",
    distance: "2.1 km",
    rating: 4.8,
    type: "Wholesale Store",
    speciality: "Bulk Groceries & Home Items",
    contact: "+91 98765 43210",
    topItems: [
      { name: "Basmati Rice (25kg)", price: 4200, available: true, discount: "5%" },
      { name: "Toor Dal (25kg)", price: 2800, available: true, discount: "3%" },
      { name: "Sunflower Oil (15L)", price: 2100, available: true, discount: "7%" },
      { name: "Sugar (50kg)", price: 2200, available: false, discount: "2%" }
    ],
    topSellingItems: [
      { name: "Basmati Rice", soldUnits: 1250, trend: "+18%", category: "Staples" },
      { name: "Sunflower Oil", soldUnits: 890, trend: "+25%", category: "Oils" },
      { name: "Toor Dal", soldUnits: 750, trend: "+12%", category: "Pulses" },
      { name: "Sugar", soldUnits: 680, trend: "+8%", category: "Staples" }
    ]
  },
  {
    id: 2,
    name: "Reliance Smart Bazaar",
    distance: "1.8 km",
    rating: 4.6,
    type: "Retail Distributor",
    speciality: "FMCG & Personal Care",
    contact: "+91 87654 32109",
    topItems: [
      { name: "Detergent Powder (10kg)", price: 850, available: true, discount: "8%" },
      { name: "Tea Leaves (5kg)", price: 1600, available: true, discount: "4%" },
      { name: "Toilet Paper (48 rolls)", price: 1800, available: true, discount: "6%" },
      { name: "Wheat Flour (50kg)", price: 2000, available: true, discount: "3%" }
    ],
    topSellingItems: [
      { name: "Tea Leaves", soldUnits: 980, trend: "+22%", category: "Beverages" },
      { name: "Detergent Powder", soldUnits: 720, trend: "+15%", category: "Home Care" },
      { name: "Wheat Flour", soldUnits: 650, trend: "+10%", category: "Staples" },
      { name: "Toilet Paper", soldUnits: 580, trend: "+28%", category: "Home Care" }
    ]
  },
  {
    id: 3,
    name: "D-Mart Wholesale",
    distance: "3.2 km",
    rating: 4.5,
    type: "Supermarket Chain",
    speciality: "Daily Essentials & Bulk Items",
    contact: "+91 76543 21098",
    topItems: [
      { name: "Rice (Sona Masoori 25kg)", price: 3800, available: true, discount: "4%" },
      { name: "Cooking Oil (20L)", price: 2800, available: true, discount: "5%" },
      { name: "Masala Mix (5kg)", price: 1200, available: true, discount: "6%" },
      { name: "Biscuits (24 packs)", price: 960, available: true, discount: "10%" }
    ],
    topSellingItems: [
      { name: "Sona Masoori Rice", soldUnits: 1100, trend: "+30%", category: "Staples" },
      { name: "Cooking Oil", soldUnits: 850, trend: "+20%", category: "Oils" },
      { name: "Biscuits", soldUnits: 780, trend: "+35%", category: "Snacks" },
      { name: "Masala Mix", soldUnits: 420, trend: "+14%", category: "Spices" }
    ]
  }
]

// Nearby retailers (competitors) selling similar items
const nearbyRetailers = [
  {
    id: 1,
    name: "Sharma Kirana Store",
    distance: "0.3 km",
    rating: 4.2,
    type: "Local Grocery",
    speciality: "Daily Essentials",
    topSellingItems: [
      { name: "Basmati Rice (1kg)", soldUnits: 450, price: 185, trend: "+12%" },
      { name: "Toor Dal (1kg)", soldUnits: 320, price: 125, trend: "+8%" },
      { name: "Tea Leaves (250g)", soldUnits: 290, price: 90, trend: "+15%" },
      { name: "Sugar (1kg)", soldUnits: 380, price: 48, trend: "+5%" }
    ]
  },
  {
    id: 2,
    name: "Modern Bazaar",
    distance: "0.7 km",
    rating: 4.4,
    type: "Convenience Store",
    speciality: "Quick Shopping",
    topSellingItems: [
      { name: "Sunflower Oil (1L)", soldUnits: 280, price: 150, trend: "+18%" },
      { name: "Detergent Powder (1kg)", soldUnits: 210, price: 98, trend: "+22%" },
      { name: "Wheat Flour (5kg)", soldUnits: 180, price: 225, trend: "+10%" },
      { name: "Toilet Paper (4 rolls)", soldUnits: 150, price: 165, trend: "+25%" }
    ]
  },
  {
    id: 3,
    name: "Super Fresh Mart",
    distance: "1.1 km",
    rating: 4.6,
    type: "Small Supermarket",
    speciality: "Fresh & Packaged Goods",
    topSellingItems: [
      { name: "Basmati Rice (1kg)", soldUnits: 520, price: 182, trend: "+20%" },
      { name: "Cooking Oil (1L)", soldUnits: 390, price: 148, trend: "+16%" },
      { name: "Tea Leaves (250g)", soldUnits: 340, price: 88, trend: "+12%" },
      { name: "Sugar (1kg)", soldUnits: 310, price: 46, trend: "+8%" }
    ]
  }
]

// Year-over-year comparison data for July 2024 vs July 2025
const yearOverYearData = [
  { 
    item: "Basmati Rice", 
    july2024: 890, 
    july2025: 1250, 
    growth: "+40%", 
    category: "Staples",
    priceChange: "+₹8/kg"
  },
  { 
    item: "Sunflower Oil", 
    july2024: 670, 
    july2025: 890, 
    growth: "+33%", 
    category: "Oils",
    priceChange: "+₹12/L"
  },
  { 
    item: "Tea Leaves", 
    july2024: 720, 
    july2025: 980, 
    growth: "+36%", 
    category: "Beverages",
    priceChange: "+₹5/250g"
  },
  { 
    item: "Toor Dal", 
    july2024: 580, 
    july2025: 750, 
    growth: "+29%", 
    category: "Pulses",
    priceChange: "+₹15/kg"
  },
  { 
    item: "Detergent Powder", 
    july2024: 450, 
    july2025: 720, 
    growth: "+60%", 
    category: "Home Care",
    priceChange: "+₹8/kg"
  }
]

// Top selling items across distributors
const topDistributorItems = [
  { name: "Basmati Rice", totalSales: 2456, distributors: 8, avgPrice: 4200, category: "Staples" },
  { name: "Toor Dal", totalSales: 1987, distributors: 6, avgPrice: 2800, category: "Pulses" },
  { name: "Sunflower Oil", totalSales: 1845, distributors: 12, avgPrice: 2100, category: "Oils" },
  { name: "Detergent Powder", totalSales: 1289, distributors: 7, avgPrice: 850, category: "Home Care" },
  { name: "Tea Leaves", totalSales: 1167, distributors: 9, avgPrice: 1600, category: "Beverages" }
]

// Market trend data for grocery items
const marketTrendData = [
  { week: 'Week 1', staples: 24000, homecare: 18000, beverages: 9000 },
  { week: 'Week 2', staples: 26000, homecare: 19000, beverages: 11000 },
  { week: 'Week 3', staples: 28000, homecare: 21000, beverages: 10500 },
  { week: 'Week 4', staples: 31000, homecare: 23000, beverages: 12000 }
]

// Year-over-year sales comparison chart data
const yearComparisonData = [
  { item: 'Basmati Rice', july2024: 890, july2025: 1250 },
  { item: 'Sunflower Oil', july2024: 670, july2025: 890 },
  { item: 'Tea Leaves', july2024: 720, july2025: 980 },
  { item: 'Toor Dal', july2024: 580, july2025: 750 },
  { item: 'Detergent', july2024: 450, july2025: 720 }
]

function NearbyStores() {
  const [selectedDistributor, setSelectedDistributor] = useState(nearbyDistributors[0])
  const [selectedRetailer, setSelectedRetailer] = useState(nearbyRetailers[0])
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Market Analytics & Distributors
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            icon={<Store size={20} />} 
            label="Distributors" 
            iconPosition="start"
          />
          <Tab 
            icon={<ShoppingBag size={20} />} 
            label="Nearby Retailers" 
            iconPosition="start"
          />
          <Tab 
            icon={<Calendar size={20} />} 
            label="Year-over-Year" 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Distributors Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Distributor List */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nearby Distributors
                </Typography>
                <List>
                  {nearbyDistributors.map((distributor, index) => (
                    <div key={distributor.id}>
                      <ListItem
                        button
                        selected={selectedDistributor.id === distributor.id}
                        onClick={() => setSelectedDistributor(distributor)}
                        sx={{
                          borderRadius: 1,
                          mb: 1,
                          '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText'
                          }
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          <Store size={20} />
                        </Avatar>
                        <ListItemText
                          primary={distributor.name}
                          secondary={
                            <Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <MapPin size={14} />
                                <Typography variant="body2">{distributor.distance}</Typography>
                              </Box>
                              <Typography variant="caption" color="textSecondary">
                                {distributor.speciality}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                <Rating value={distributor.rating} precision={0.1} size="small" readOnly />
                                <Typography variant="body2">({distributor.rating})</Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < nearbyDistributors.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Top Items from Distributors */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Popular Items from Distributors
                </Typography>
                <List>
                  {topDistributorItems.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`${item.distributors} distributors • ₹${item.avgPrice.toLocaleString('en-IN')} avg`}
                      />
                      <Box textAlign="right">
                        <Typography variant="h6" color="primary">
                          {item.totalSales}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          units sold
                        </Typography>
                        <Chip 
                          label={item.category} 
                          size="small" 
                          variant="outlined"
                          sx={{ mt: 0.5, display: 'block' }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Selected Distributor Details */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedDistributor.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MapPin size={16} />
                        <Typography variant="body2">{selectedDistributor.distance}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Star size={16} />
                        <Typography variant="body2">{selectedDistributor.rating} rating</Typography>
                      </Box>
                      <Chip label={selectedDistributor.type} variant="outlined" size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Contact: {selectedDistributor.contact}
                    </Typography>
                  </Box>
                  <Button variant="outlined" startIcon={<TrendingUp />}>
                    Call Distributor
                  </Button>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Available Items with Bulk Prices
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {selectedDistributor.topItems.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card variant="outlined">
                        <CardContent sx={{ p: 2 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {item.name}
                            </Typography>
                            <Box display="flex" gap={1}>
                              <Chip 
                                label={item.available ? "Available" : "Out of Stock"} 
                                color={item.available ? "success" : "error"}
                                size="small"
                              />
                              <Chip 
                                label={`${item.discount} OFF`} 
                                color="warning" 
                                size="small"
                              />
                            </Box>
                          </Box>
                          <Typography variant="h5" color="primary" gutterBottom>
                            ₹{item.price.toLocaleString('en-IN')}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Bulk purchase price
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={item.available ? 85 : 0} 
                            sx={{ mt: 1 }}
                            color={item.available ? "success" : "error"}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Top Selling Items from Selected Distributor */}
                <Typography variant="h6" gutterBottom>
                  Top Selling Items This Month
                </Typography>
                <Grid container spacing={2}>
                  {selectedDistributor.topSellingItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {item.name}
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom>
                          {item.soldUnits}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          units sold
                        </Typography>
                        <Chip 
                          label={item.trend} 
                          color="success" 
                          size="small"
                          icon={<TrendingUp size={14} />}
                        />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          {item.category}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Nearby Retailers Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nearby Competing Retailers
                </Typography>
                <List>
                  {nearbyRetailers.map((retailer, index) => (
                    <div key={retailer.id}>
                      <ListItem
                        button
                        selected={selectedRetailer.id === retailer.id}
                        onClick={() => setSelectedRetailer(retailer)}
                        sx={{
                          borderRadius: 1,
                          mb: 1,
                          '&.Mui-selected': {
                            backgroundColor: 'secondary.light',
                            color: 'secondary.contrastText'
                          }
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                          <ShoppingBag size={20} />
                        </Avatar>
                        <ListItemText
                          primary={retailer.name}
                          secondary={
                            <Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <MapPin size={14} />
                                <Typography variant="body2">{retailer.distance}</Typography>
                              </Box>
                              <Typography variant="caption" color="textSecondary">
                                {retailer.speciality}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                <Rating value={retailer.rating} precision={0.1} size="small" readOnly />
                                <Typography variant="body2">({retailer.rating})</Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < nearbyRetailers.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {selectedRetailer.name} - Top Selling Items
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
                  {selectedRetailer.distance} • {selectedRetailer.type} • {selectedRetailer.speciality}
                </Typography>
                
                <Grid container spacing={2}>
                  {selectedRetailer.topSellingItems.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" fontWeight="bold">
                              {item.name}
                            </Typography>
                            <Chip 
                              label={item.trend} 
                              color="success" 
                              size="small"
                            />
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="body2" color="textSecondary">
                              Units Sold:
                            </Typography>
                            <Typography variant="h5" color="primary">
                              {item.soldUnits}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="textSecondary">
                              Price:
                            </Typography>
                            <Typography variant="h6">
                              ₹{item.price}
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={(item.soldUnits / 600) * 100} 
                            sx={{ mt: 2 }}
                            color="success"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Year-over-Year Comparison Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  July 2024 vs July 2025 - Sales Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={yearComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="july2024" fill="#ff9800" name="July 2024" />
                    <Bar dataKey="july2025" fill="#1976d2" name="July 2025" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Year-over-Year Growth Analysis
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Growth</TableCell>
                        <TableCell align="right">Price Change</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {yearOverYearData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {item.item}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {item.category}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={item.growth} 
                              color="success" 
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="error">
                              {item.priceChange}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Market Trends Chart - Common for all tabs */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Grocery Market Trends (Last 4 Weeks)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="staples" 
                stroke="#1976d2" 
                strokeWidth={2}
                name="Staples (Rice, Dal, etc.)"
              />
              <Line 
                type="monotone" 
                dataKey="homecare" 
                stroke="#4caf50" 
                strokeWidth={2}
                name="Home Care"
              />
              <Line 
                type="monotone" 
                dataKey="beverages" 
                stroke="#ff9800" 
                strokeWidth={2}
                name="Beverages"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribution Insights */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Market Insights Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box textAlign="center" p={2}>
                <Typography variant="h3" color="primary">
                  15%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Better Bulk Prices
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center" p={2}>
                <Typography variant="h3" color="success.main">
                  ₹12.5L
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Market Volume
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center" p={2}>
                <Typography variant="h3" color="warning.main">
                  18%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg Distributor Margin
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center" p={2}>
                <Typography variant="h3" color="error.main">
                  +32%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  YoY Average Growth
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default NearbyStores

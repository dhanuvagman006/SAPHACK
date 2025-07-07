import { useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, Package, AlertTriangle, DollarSign } from 'lucide-react'

// Mock data for inventory - Indian grocery/home items
const inventoryData = [
  { name: 'Basmati Rice (1kg)', stock: 45, minStock: 20, price: 180 },
  { name: 'Toor Dal (1kg)', stock: 12, minStock: 15, price: 120 },
  { name: 'Sunflower Oil (1L)', stock: 8, minStock: 12, price: 145 },
  { name: 'Wheat Flour (5kg)', stock: 25, minStock: 10, price: 220 },
  { name: 'Sugar (1kg)', stock: 35, minStock: 20, price: 45 },
  { name: 'Tea Leaves (250g)', stock: 60, minStock: 30, price: 85 },
  { name: 'Detergent Powder (1kg)', stock: 18, minStock: 15, price: 95 },
  { name: 'Toilet Paper (4 rolls)', stock: 22, minStock: 25, price: 160 }
]

const salesData = [
  { month: 'Jan', sales: 45000, profit: 12000 },
  { month: 'Feb', sales: 52000, profit: 15000 },
  { month: 'Mar', sales: 48000, profit: 13500 },
  { month: 'Apr', sales: 61000, profit: 18000 },
  { month: 'May', sales: 55000, profit: 16500 },
  { month: 'Jun', sales: 67000, profit: 20000 }
]

const categoryData = [
  { name: 'Groceries', value: 45, color: '#0088FE' },
  { name: 'Home Care', value: 25, color: '#00C49F' },
  { name: 'Personal Care', value: 20, color: '#FFBB28' },
  { name: 'Beverages', value: 10, color: '#FF8042' }
]

function Dashboard() {
  const [inventory] = useState(inventoryData)
  
  const lowStockItems = inventory.filter(item => item.stock < item.minStock)
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.price), 0)
  const totalItems = inventory.reduce((sum, item) => sum + item.stock, 0)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stock Management Dashboard
      </Typography>
      
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Package size={24} color="#1976d2" />
                <Box ml={2}>
                  <Typography color="textSecondary" gutterBottom>
                    Total Items
                  </Typography>
                  <Typography variant="h4">
                    {totalItems}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <DollarSign size={24} color="#4caf50" />
                <Box ml={2}>
                  <Typography color="textSecondary" gutterBottom>
                    Inventory Value
                  </Typography>
                  <Typography variant="h4">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AlertTriangle size={24} color="#ff9800" />
                <Box ml={2}>
                  <Typography color="textSecondary" gutterBottom>
                    Low Stock Alerts
                  </Typography>
                  <Typography variant="h4">
                    {lowStockItems.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUp size={24} color="#f44336" />
                <Box ml={2}>
                  <Typography color="textSecondary" gutterBottom>
                    Monthly Sales
                  </Typography>
                  <Typography variant="h4">
                    ₹67,000
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Low Stock Alert!
          </Typography>
          {lowStockItems.map(item => (
            <Typography key={item.name}>
              {item.name}: {item.stock} remaining (minimum: {item.minStock})
            </Typography>
          ))}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Inventory Status */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Inventory
              </Typography>
              <List>
                {inventory.map(item => (
                  <ListItem key={item.name}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Price: ₹${item.price}`}
                    />
                    <Box textAlign="right" minWidth={120}>
                      <Typography variant="body2">
                        {item.stock} units
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(item.stock / (item.minStock * 2)) * 100}
                        color={item.stock < item.minStock ? "error" : "primary"}
                        sx={{ mt: 1 }}
                      />
                      <Chip
                        label={item.stock < item.minStock ? "Low Stock" : "In Stock"}
                        color={item.stock < item.minStock ? "error" : "success"}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#1976d2" name="Sales" />
                  <Bar dataKey="profit" fill="#4caf50" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Paper sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}>
                  <Typography variant="body1">📦 Add New Stock</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Add new items to inventory
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}>
                  <Typography variant="body1">🔔 Set Low Stock Alerts</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Configure minimum stock levels
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}>
                  <Typography variant="body1">📊 Generate Reports</Typography>
                  <Typography variant="body2" color="textSecondary">
                    View detailed analytics and reports
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard

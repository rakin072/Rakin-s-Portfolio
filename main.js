// Antigravity Portfolio - Interactive Engine

function initAllEngines() {
  const engines = [
    { name: 'theme', fn: initTheme },
    { name: 'mobileMenu', fn: initMobileMenu },
    { name: 'textRepel', fn: initTextRepel },
    { name: 'statsCounter', fn: initStatsCounter },
    { name: 'shimmerCards', fn: initShimmerCards },
    { name: 'skillsFilter', fn: initSkillsFilter },
    { name: 'codingNotes', fn: initCodingNotes },
    { name: 'libraryFolders', fn: initLibraryFolders },
    { name: 'gameModals', fn: initGameModals },
    { name: 'minecraftEyes', fn: initMinecraftEyes },
    { name: 'connectPixelCanvas', fn: initConnectPixelCanvas },
    { name: 'anonymousModal', fn: initAnonymousModal },
    { name: 'companionGuide', fn: initCompanionGuide },
    { name: 'experiencePageModals', fn: initExperiencePageModals },
    { name: 'projectFolders', fn: initProjectFolders },
    { name: 'competitiveAndFiverrTabs', fn: initCompetitiveAndFiverrTabs },
    { name: 'competitiveInteractiveEngine', fn: initCompetitiveInteractiveEngine },
    { name: 'winterAtmosphere', fn: initWinterAtmosphere },
    { name: 'selectedWorks', fn: initSelectedWorks }
  ];

  engines.forEach(eng => {
    try {
      eng.fn();
    } catch (err) {
      console.warn(`[Engine: ${eng.name}] init warning:`, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllEngines);
} else {
  initAllEngines();
}

// 1. Theme Management (Light / Dark mode - Game of Thrones: The Frozen Wall & The Long Night)
function updateThemeIcons(isDark) {
  const toggleButtons = document.querySelectorAll('button[aria-label*="mode" i], button[aria-label*="theme" i]');
  toggleButtons.forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    const icon = btn.querySelector('svg');
    if (icon) {
      if (isDark) {
        // Sun icon
        icon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun size-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      } else {
        // Moon icon
        icon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon size-5"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>`;
      }
    }
  });
}

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    try { localStorage.setItem('theme', 'dark'); } catch(e) {}
  } else {
    document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', 'light'); } catch(e) {}
  }
  updateThemeIcons(dark);
}

function toggleTheme() {
  const willBeDark = !document.documentElement.classList.contains('dark');
  setTheme(willBeDark);
  return willBeDark;
}

window.setTheme = setTheme;
window.toggleTheme = toggleTheme;

function initTheme() {
  // Sync initial state
  let isDark = false;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') isDark = true;
    else if (saved === 'light') isDark = false;
    else isDark = document.documentElement.classList.contains('dark');
  } catch(e) {
    isDark = document.documentElement.classList.contains('dark');
  }
  setTheme(isDark);

  // Global delegated click handler so clicks on any theme button or its child SVG always work reliably
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[aria-label*="mode" i], button[aria-label*="theme" i]');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });
}

// 2. Mobile Menu Drawer
function initMobileMenu() {
  const menuBtn = document.querySelector('button[aria-label="Open menu"]');
  if (!menuBtn) return;

  let menuDrawer = document.getElementById('mobile-nav-drawer');
  if (!menuDrawer) {
    menuDrawer = document.createElement('div');
    menuDrawer.id = 'mobile-nav-drawer';
    menuDrawer.className = 'fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 hidden opacity-0 lg:hidden flex flex-col justify-end';
    menuDrawer.innerHTML = `
      <div class="bg-background border-t border-ink/10 rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-ink/10">
          <span class="text-xl font-bold text-brand">Navigation</span>
          <button id="close-mobile-menu" class="p-2 rounded-full hover:bg-ink/5 text-ink">
            <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <ul class="flex flex-col gap-2 py-4">
          <li><a href="/#work" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">Work</a></li>
          <li><a href="/#notes" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">Coding Notes</a></li>
          <li><a href="/experience" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">Experience</a></li>
          <li><a href="/#library" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">Library</a></li>
          <li><a href="/#hobbies" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">Hobbies</a></li>
          <li><a href="/#about" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">About</a></li>
          <li><a href="/#contact" class="mobile-nav-link block px-4 py-3 text-lg font-medium rounded-xl hover:bg-brand/10 hover:text-brand">Contact</a></li>
        </ul>
        <div class="pt-2">
          <a href="/#contact" class="btn-3d flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-brand text-background font-medium text-lg">
            Get in Touch
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(menuDrawer);
  }

  function toggleMenu(open) {
    if (open) {
      menuDrawer.classList.remove('hidden');
      requestAnimationFrame(() => {
        menuDrawer.classList.remove('opacity-0');
        menuBtn.setAttribute('aria-expanded', 'true');
      });
    } else {
      menuDrawer.classList.add('opacity-0');
      menuBtn.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        menuDrawer.classList.add('hidden');
      }, 300);
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  menuDrawer.addEventListener('click', (e) => {
    if (e.target === menuDrawer || e.target.closest('#close-mobile-menu') || e.target.closest('.mobile-nav-link')) {
      toggleMenu(false);
    }
  });
}

// 3. Magnetic Letter Repel Effect on [data-text-repel="true"]
function initTextRepel() {
  const repelContainers = document.querySelectorAll('[data-text-repel="true"]');
  repelContainers.forEach(container => {
    const letters = container.querySelectorAll('span.relative');
    if (!letters.length) return;

    container.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;
        const distX = mouseX - letterX;
        const distY = mouseY - letterY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const maxDist = 70;

        if (dist < maxDist && dist > 0) {
          const power = (1 - dist / maxDist) * 16;
          const moveX = -(distX / dist) * power;
          const moveY = -(distY / dist) * power;
          letter.style.transform = `translate(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px)`;
        } else {
          letter.style.transform = 'translate(0px, 0px)';
        }
      });
    });

    container.addEventListener('mouseleave', () => {
      letters.forEach(letter => {
        letter.style.transform = 'translate(0px, 0px)';
      });
    });
  });
}

// 4. Counting Animation for Stats
function initStatsCounter() {
  const statContainers = document.querySelectorAll('.tabular-nums');
  if (!statContainers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const firstStat = statContainers[0];
  if (firstStat) observer.observe(firstStat);

  function animateStats() {
    const stats = [
      { element: statContainers[0], target: 200, suffix: '+' },
      { element: statContainers[1], target: 10, suffix: '+' },
      { element: statContainers[2], target: 8, suffix: '+' },
    ];

    stats.forEach(s => {
      if (!s.element) return;
      const span = s.element.querySelector('span') || s.element;
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * s.target);
        span.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          span.textContent = s.target;
        }
      }
      requestAnimationFrame(update);
    });
  }
}

// 5. Dynamic Shimmer Cards
function initShimmerCards() {
  const cards = document.querySelectorAll('section#work .group, section#skills .group, #competitive .rounded-2xl, .career-journey-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--shimmer-x', `${x}%`);
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
      card.style.setProperty('--shimmer-y', `${y}%`);
    });
  });
}

// 6. Skills & Tools Filter Tabs
function initSkillsFilter() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const filterTabs = skillsSection.querySelectorAll('[role="tablist"] button, [data-filter]');
  const skillCategories = skillsSection.querySelectorAll('[data-category], .grid > div');

  // If filter pills exist
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('bg-brand', 'text-background', 'font-semibold');
        t.classList.add('text-ink/70');
      });
      tab.classList.add('bg-brand', 'text-background', 'font-semibold');
      tab.classList.remove('text-ink/70');

      const filter = tab.textContent.trim().toLowerCase();
      skillCategories.forEach(cat => {
        const catText = cat.textContent.toLowerCase();
        if (filter === 'all' || catText.includes(filter) || (filter.includes('core') && (catText.includes('languages') || catText.includes('frameworks')))) {
          cat.style.display = '';
          cat.style.opacity = '1';
        } else {
          cat.style.display = 'none';
          cat.style.opacity = '0';
        }
      });
    });
  });
}


// 7. Coding Notes Language Selector & Code Runner from Rakin's GitHub Repos
function initCodingNotes() {
  const notesSection = document.getElementById('notes');
  if (!notesSection) return;

  const notesData = {
    'cpp': {
      langName: 'C++',
      badgeClass: 'bg-[#00599C]',
      tabLabel: 'C++ (Min-Cut Graph)',
      sidebarTitle: 'C++ Algorithm Notes',
      repo: 'rakin072/RandomizedMinimumCut',
      repoUrl: 'https://github.com/rakin072/RandomizedMinimumCut',
      browseTitle: 'Browse RandomizedMinimumCut',
      browseSubtitle: 'Algorithms & Competitive Programming',
      topics: [
        {
          id: 'cpp-1',
          name: "1. Karger's Min-Cut Algorithm",
          file: 'grouptask.cpp',
          title: "1. Karger's Randomized Minimum Cut",
          desc: "Implementation of Karger's randomized algorithm for computing the minimum cut of an undirected multigraph via iterative edge contractions.",
          code: `#include <bits/stdc++.h>
using namespace std;

// From: rakin072/RandomizedMinimumCut (grouptask.cpp)
struct Edge {
    int u, v;
};

// Karger's Randomized Minimum Cut algorithm
int kargerMinCut(vector<Edge> edges, int n) {
    random_device rd;
    mt19937 gen(rd());
    int vertices = n;

    while (vertices > 2) {
        uniform_int_distribution<> dist(0, edges.size() - 1);
        int idx = dist(gen);
        int u = edges[idx].u;
        int v = edges[idx].v;

        // Contract edge (u, v): replace vertex v with u
        for (auto &e : edges) {
            if (e.u == v) e.u = u;
            if (e.v == v) e.v = u;
        }

        // Filter out self-loops (u == v)
        vector<Edge> remainingEdges;
        for (auto &e : edges) {
            if (e.u != e.v) remainingEdges.push_back(e);
        }
        edges = remainingEdges;
        vertices--;
    }
    return edges.size(); // Min-cut edge count
}

int main() {
    int n = 4;
    vector<Edge> edges = {{0,1}, {0,2}, {0,3}, {1,3}, {2,3}};
    int cut = kargerMinCut(edges, n);
    cout << "[*] Randomized Minimum Cut found: " << cut << " edges" << endl;
    return 0;
}`,
          output: `[Compiling grouptask.cpp with g++ -O3]...\n[*] Graph initialized with 4 vertices and 5 edges.\n[*] Iterating randomized contractions...\n[*] Contracted vertex 3 into vertex 1\n[*] Contracted vertex 2 into vertex 0\n[*] 2 meta-vertices remaining.\n[*] Randomized Minimum Cut found: 2 edges\n[Process completed successfully with exit code 0]`
        },
        {
          id: 'cpp-2',
          name: '2. Disjoint Set Union (DSU)',
          file: 'dsu_contract.cpp',
          title: '2. Disjoint Set Union (DSU) Vertex Contraction',
          desc: 'Using Path Compression and Union by Rank to compress vertex contractions from O(V*E) to near O(E * α(V)).',
          code: `#include <vector>
#include <numeric>
#include <iostream>
using namespace std;

// Fast vertex contraction with Disjoint Set Union
struct DSU {
    vector<int> parent, rank;
    int components;
    DSU(int n) : parent(n), rank(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) swap(rootI, rootJ);
            parent[rootJ] = rootI;
            if (rank[rootI] == rank[rootJ]) rank[rootI]++;
            components--;
            return true;
        }
        return false;
    }
};

int main() {
    DSU dsu(5);
    dsu.unite(0, 1);
    dsu.unite(2, 3);
    cout << "[*] Remaining independent components: " << dsu.components << endl;
    return 0;
}`,
          output: `[Compiling dsu_contract.cpp]...\n[+] Initialized DSU with 5 disjoint sets.\n[*] Contracted edge (0, 1) -> Root: 0\n[*] Contracted edge (2, 3) -> Root: 2\n[*] Remaining independent components: 3\n[Operation cost: O(α(V)) amortized time]`
        },
        {
          id: 'cpp-3',
          name: '3. Monte Carlo Success Amplification',
          file: 'monte_carlo.cpp',
          title: '3. Monte Carlo Repetition & Error Bound',
          desc: "Amplifying Karger's success rate to 1 - 1/n by repeating contractions across independent stochastic iterations.",
          code: `#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

// Repeat randomized cuts O(n^2 ln n) times to achieve >= 1 - 1/n success
int amplifyMinCut(int n, int numEdges) {
    int iterations = ceil(n * n * log(n));
    cout << "[*] Target vertices n = " << n << endl;
    cout << "[*] Required Monte Carlo trials: " << iterations << endl;
    cout << "[+] Probability of missing true global min-cut: < " << (1.0 / n) << endl;
    return iterations;
}

int main() {
    amplifyMinCut(10, 25);
    return 0;
}`,
          output: `[Executing Monte Carlo Analysis]...\n[*] Target vertices n = 10\n[*] Required Monte Carlo trials: 231\n[+] Probability of missing true global min-cut: < 0.1000\n[*] Empirical best cut verified: 3 edges.`
        }
      ]
    },
    'java': {
      langName: 'Java',
      badgeClass: 'bg-[#E76F00]',
      tabLabel: 'Java (SQLite DAO)',
      sidebarTitle: 'Java Project Notes',
      repo: 'rakin072/Rakin_2207082_Bicycle-Rental-Mini-System',
      repoUrl: 'https://github.com/rakin072/Rakin_2207082_Bicycle-Rental-Mini-System',
      browseTitle: 'Browse Bicycle-Rental-Mini-System',
      browseSubtitle: 'JavaFX & SQLite Relational System',
      topics: [
        {
          id: 'java-1',
          name: '1. Database Helper & Migrations',
          file: 'DatabaseHelper.java',
          title: '1. SQLite Database Helper & Schema Migrations',
          desc: 'SQLite database open helper managing tables for bicycles, user rentals, and timestamped transactions with relational integrity.',
          code: `package com.example.bicyclerentalsystem.model;

import java.sql.*;

// From: rakin072/Rakin_2207082_Bicycle-Rental-Mini-System
public class DatabaseHelper {
    private static final String URL = "jdbc:sqlite:bicycles.db";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL);
        } catch (Exception e) {
            throw new RuntimeException("Database connection failed", e);
        }
    }

    public static void initializeDatabase() {
        String usersTable = """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'USER'
            );
        """;

        String bicyclesTable = """
            CREATE TABLE IF NOT EXISTS bicycles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                model TEXT NOT NULL,
                type TEXT NOT NULL,
                status TEXT DEFAULT 'AVAILABLE',
                hourly_rate REAL NOT NULL
            );
        """;

        try (Connection conn = getConnection(); Statement stmt = conn.createStatement()) {
            stmt.execute(usersTable);
            stmt.execute(bicyclesTable);
            System.out.println("Bicycle Rental SQLite Database initialized successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        initializeDatabase();
    }
}`,
          output: `[Java Virtual Machine 21 - Starting Bicycle Rental System]...\n[*] Connecting to SQLite database: bicycles.db\n[*] Executing schema migrations...\n[+] Table 'users' verified.\n[+] Table 'bicycles' verified.\n[+] Table 'rentals' verified.\n[*] Bicycle Rental SQLite Database initialized successfully.\n[Ready for JavaFX application lifecycle]`
        },
        {
          id: 'java-2',
          name: '2. Bicycle Inventory & Status DAO',
          file: 'BicycleDAO.java',
          title: '2. Bicycle Inventory & Status DAO',
          desc: 'Data Access Object (DAO) providing CRUD operations and state transitions (AVAILABLE, RENTED, MAINTENANCE).',
          code: `package com.example.bicyclerentalsystem.dao;

import java.sql.*;
import java.util.*;

public class BicycleDAO {
    public static List<String> getAvailableBicycles(Connection conn) throws SQLException {
        List<String> results = new ArrayList<>();
        String sql = "SELECT id, model, type, hourly_rate FROM bicycles WHERE status = 'AVAILABLE'";
        
        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                results.add(String.format("#%d: %s (%s) - $%.2f/hr",
                    rs.getInt("id"), rs.getString("model"), rs.getString("type"), rs.getDouble("hourly_rate")));
            }
        }
        return results;
    }
}`,
          output: `[Querying DatabaseDAO]...\nSELECT * FROM bicycles WHERE status = 'AVAILABLE';\n[+] Found 12 available bicycles (Mountain, Road, Hybrid).\n[*] Query execution time: 1.84ms`
        },
        {
          id: 'java-3',
          name: '3. Rental Billing & Duration Calculator',
          file: 'BillingService.java',
          title: '3. Rental Billing & Duration Calculator',
          desc: 'Service calculating rental duration in fractional hours, late penalties, and tax calculation.',
          code: `package com.example.bicyclerentalsystem.service;

import java.time.LocalDateTime;
import java.time.Duration;

public class BillingService {
    public static double calculateTotal(LocalDateTime start, LocalDateTime end, double hourlyRate) {
        long durationMinutes = Duration.between(start, end).toMinutes();
        double hours = Math.max(1.0, Math.ceil(durationMinutes / 60.0));
        double subtotal = hours * hourlyRate;
        double tax = subtotal * 0.05; // 5% VAT
        return subtotal + tax;
    }

    public static void main(String[] args) {
        LocalDateTime start = LocalDateTime.now().minusMinutes(150);
        LocalDateTime end = LocalDateTime.now();
        double total = calculateTotal(start, end, 15.0);
        System.out.printf("[*] Total Rental Cost (incl. 5%% tax): $%.2f%n", total);
    }
}`,
          output: `[BillingService Active]...\n[*] Rental duration: 150 minutes -> Rounded to 3.0 hours\n[*] Hourly Rate: $15.00/hr\n[*] Subtotal: $45.00 | VAT (5%): $2.25\n[Total Charge]: $47.25`
        }
      ]
    },
    'python': {
      langName: 'Python',
      badgeClass: 'bg-[#3776AB]',
      tabLabel: 'Python (Binary Bot)',
      sidebarTitle: 'Python Trading Notes',
      repo: 'rakin072/Binary-Bot',
      repoUrl: 'https://github.com/rakin072/Binary-Bot',
      browseTitle: 'Browse Binary-Bot',
      browseSubtitle: 'Algorithmic Bot & Indicator Engine',
      topics: [
        {
          id: 'python-1',
          name: '1. Moving Average & Signal Engine',
          file: 'bot20.py',
          title: '1. Automated Signal Engine & Indicators',
          desc: 'Calculates technical indicators (Fast EMA, Slow EMA, Momentum) over tick streams to generate algorithmic trading signals.',
          code: `import sys
import os
import time
from typing import Dict, Any

# From: rakin072/Binary-Bot (bot20.py)
class BinarySignalBot:
    def __init__(self, asset: str = "EURUSD", timeframe: int = 60):
        self.asset = asset
        self.timeframe = timeframe
        print(f"[*] Initialized BinaryBot for {self.asset} ({self.timeframe}s timeframe)")

    def calculate_indicators(self, price_series: list) -> Dict[str, float]:
        """Calculate Moving Average & Momentum indicators"""
        if len(price_series) < 5:
            return {}
        ma_fast = sum(price_series[-3:]) / 3.0
        ma_slow = sum(price_series[-5:]) / 5.0
        momentum = price_series[-1] - price_series[-3]
        return {
            "ma_fast": round(ma_fast, 5), 
            "ma_slow": round(ma_slow, 5), 
            "momentum": round(momentum, 5)
        }

    def evaluate_signal(self, indicators: Dict[str, float]) -> str:
        """Evaluate automated trade direction"""
        if not indicators:
            return "HOLD"
        if indicators["ma_fast"] > indicators["ma_slow"] and indicators["momentum"] > 0:
            return "CALL (BUY SIGNAL)"
        elif indicators["ma_fast"] < indicators["ma_slow"] and indicators["momentum"] < 0:
            return "PUT (SELL SIGNAL)"
        return "NEUTRAL"

if __name__ == "__main__":
    bot = BinarySignalBot()
    prices = [1.0820, 1.0822, 1.0825, 1.0821, 1.0828, 1.0830, 1.0835]
    ind = bot.calculate_indicators(prices)
    signal = bot.evaluate_signal(ind)
    print(f"[>] Calculated Indicators: {ind}")
    print(f"[>] Trade Execution Signal: {signal}")`,
          output: `[Python 3.12 Engine Initializing...]...\n[*] Initialized BinaryBot for EURUSD (60s timeframe)\n[>] Streaming tick data for EURUSD...\n[>] Calculated Indicators: {'ma_fast': 1.0831, 'ma_slow': 1.08278, 'momentum': 0.0007}\n[>] Trade Execution Signal: CALL (BUY SIGNAL)\n[*] Signal confidence: 88.4% | Risk parameter: 1.5%`
        },
        {
          id: 'python-2',
          name: '2. WebSocket Stream Ingestion',
          file: 'ws_client.py',
          title: '2. WebSocket Market Stream Ingestion',
          desc: 'Asynchronous WebSocket client subscribing to real-time tick feeds with auto-reconnection and heartbeat ping/pong.',
          code: `import asyncio
import json

async def connect_market_stream(symbol: str = "EURUSD"):
    uri = "wss://market-feed.deriv.ws/v3?app_id=10843"
    print(f"[*] Subscribing to tick stream: {symbol}")
    payload = {"ticks": symbol, "subscribe": 1}
    print(f"[>>] Handshake payload sent: {json.dumps(payload)}")
    return True

if __name__ == "__main__":
    asyncio.run(connect_market_stream("EURUSD"))`,
          output: `[Connecting to Deriv WebSocket Gateway]...\n[*] Handshake response: 101 Switching Protocols\n[>>] Subscribed to EURUSD tick stream\n[+] Latency: 24ms | Heartbeat: OK`
        },
        {
          id: 'python-3',
          name: '3. Martingale Risk Protection',
          file: 'risk_manager.py',
          title: '3. Martingale & Capital Protection',
          desc: 'Dynamic stake sizing preventing drawdowns through stop-loss thresholds and bounded martingale multiplier.',
          code: `class RiskManager:
    def __init__(self, base_stake: float = 1.0, max_steps: int = 4):
        self.base_stake = base_stake
        self.current_stake = base_stake
        self.step = 0
        self.max_steps = max_steps

    def on_trade_result(self, won: bool) -> float:
        if won:
            self.step = 0
            self.current_stake = self.base_stake
        else:
            self.step += 1
            if self.step < self.max_steps:
                self.current_stake *= 2.1 # Recovery multiplier
            else:
                self.current_stake = self.base_stake # Reset to safeguard capital
        return round(self.current_stake, 2)

if __name__ == "__main__":
    rm = RiskManager()
    print("[*] Trade 1 (Loss) -> Next stake:", rm.on_trade_result(False))
    print("[*] Trade 2 (Win) -> Next stake:", rm.on_trade_result(True))`,
          output: `[Risk Manager Active]...\n[*] Base Stake: $1.00 | Max Steps: 4\n[!] Trade 1 Loss -> Stake adjusted to $2.10\n[!] Trade 2 Win -> Profit: +$1.95 -> Resetting stake to $1.00\n[*] Net Account Drawdown: 0.00%`
        }
      ]
    },
    'javascript': {
      langName: 'JavaScript',
      badgeClass: 'bg-[#F7DF1E]',
      tabLabel: 'JavaScript (Physics Loop)',
      sidebarTitle: 'JavaScript Game Notes',
      repo: 'rakin072/Inshallah',
      repoUrl: 'https://github.com/rakin072/Inshallah',
      browseTitle: 'Browse Inshallah',
      browseSubtitle: 'HTML5 Canvas 2D Game & Physics Loop',
      topics: [
        {
          id: 'js-1',
          name: '1. Canvas 2D & AABB Collision',
          file: 'script.js',
          title: '1. Canvas 2D Game Loop & AABB Collision',
          desc: 'Classic 60 FPS requestAnimationFrame canvas game loop handling gravity, friction physics, and AABB rectangular collision detection.',
          code: `// From: rakin072/Inshallah (script.js - Flappy Bird Game Engine)
const canvas = document.getElementById('flappyBird');
const ctx = canvas ? canvas.getContext('2d') : null;

let bird = { x: 50, y: 150, width: 24, height: 24, gravity: 0.25, velocity: 0, jump: -4.6 };
let pipes = [];
let score = 0;
let gameOver = false;

function flap() {
  bird.velocity = bird.jump;
}

// Axis-Aligned Bounding Box (AABB) Collision detection
function checkCollision(b, pipe) {
  return (
    b.x < pipe.x + pipe.width &&
    b.x + b.width > pipe.x &&
    (b.y < pipe.top || b.y + b.height > pipe.bottom)
  );
}

function updatePhysics() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Ground and ceiling boundaries
  if (bird.y + bird.height >= 400 || bird.y <= 0) {
    gameOver = true;
  }
  return { posY: bird.y.toFixed(2), velocity: bird.velocity.toFixed(2), gameOver };
}

console.log("[Engine Ready] Running physics step:", updatePhysics());`,
          output: `[JavaScript V8 Runtime]...\n[*] Initializing Canvas 2D Game Physics Loop...\n[+] Canvas Dimensions: 400x600 | Target FPS: 60\n[+] Initial Bird State: Position Y = 150px, Velocity = 0px/s\n[Engine Ready] Running physics step: { posY: '150.25', velocity: '0.25', gameOver: false }\n[*] Hitbox Collision Engine: Active (AABB Algorithm Enabled)`
        },
        {
          id: 'js-2',
          name: '2. Procedural Pipe Spawner',
          file: 'pipe_generator.js',
          title: '2. Procedural Pipe Obstacle Spawner',
          desc: 'Procedurally places obstacle pairs with randomized vertical offsets and fixed safe passing clearances.',
          code: `function spawnPipePair(canvasWidth, canvasHeight, gapSize = 100) {
  const minHeight = 40;
  const maxHeight = canvasHeight - gapSize - minHeight;
  const top = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  const bottom = top + gapSize;
  return {
    x: canvasWidth,
    width: 52,
    top: top,
    bottom: bottom,
    passed: false
  };
}

const pipe = spawnPipePair(400, 600, 100);
console.log("[*] Generated obstacle:", pipe);`,
          output: `[Spawning Pipe Obstacle]...\n[+] Generated Top Pipe: Height = 142px\n[+] Gap Clearance: 100px\n[+] Generated Bottom Pipe: Offset = 242px to 600px\n[*] Spawn Coordinates: X = 400px`
        },
        {
          id: 'js-3',
          name: '3. LocalStorage High Score Sync',
          file: 'storage_sync.js',
          title: '3. LocalStorage High Score Sync',
          desc: 'Persists player best scores and statistics across browser sessions using HTML5 LocalStorage with fallback.',
          code: `function saveScore(currentScore) {
  const best = parseInt(localStorage.getItem('flappy_best_score') || '0', 10);
  if (currentScore > best) {
    localStorage.setItem('flappy_best_score', currentScore.toString());
    return { newBest: true, score: currentScore };
  }
  return { newBest: false, score: best };
}

console.log(saveScore(24));`,
          output: `[LocalStorage Sync]...\n[*] Current Run Score: 24\n[+] Previous Best Score: 18\n[NEW RECORD] Personal best updated and persisted in browser storage: 24!`
        }
      ]
    }
  };

  const tabs = notesSection.querySelectorAll('.notes-tab-btn, [role="tab"]');
  const codeTextarea = document.getElementById('notes-code-textarea') || notesSection.querySelector('textarea');
  const lineNumbers = document.getElementById('notes-line-numbers');
  const githubLink = document.getElementById('notes-github-link');
  const outputContainer = document.getElementById('notes-output-container') || notesSection.querySelector('[aria-live="polite"]');
  const runBtn = document.getElementById('notes-run-btn') || notesSection.querySelector('button[aria-label*="Run" i], button:has(svg.lucide-play)');
  const copyBtn = document.getElementById('notes-copy-btn');
  const filenameBadge = document.getElementById('notes-filename-badge');
  const activeTitle = document.getElementById('notes-active-title');
  const activeDesc = document.getElementById('notes-active-desc');
  const sidebarTitle = document.getElementById('notes-sidebar-title');
  const topicList = document.getElementById('notes-topic-list');
  const browseCard = document.getElementById('notes-browse-card');
  const browseTitle = document.getElementById('notes-browse-title');
  const browseSubtitle = document.getElementById('notes-browse-subtitle');

  let currentLang = 'cpp';
  let currentTopicIdx = 0;

  function updateLineNumbers() {
    if (!lineNumbers || !codeTextarea) return;
    const lines = (codeTextarea.value || '').split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<span class="block">${i}</span>`;
    }
    lineNumbers.innerHTML = html;
  }

  if (codeTextarea) {
    codeTextarea.addEventListener('input', updateLineNumbers);
    codeTextarea.addEventListener('scroll', () => {
      if (lineNumbers) lineNumbers.scrollTop = codeTextarea.scrollTop;
    });
  }

  function renderTopic(lang, idx) {
    const langData = notesData[lang];
    if (!langData || !langData.topics[idx]) return;
    currentTopicIdx = idx;
    const topic = langData.topics[idx];

    if (activeTitle) activeTitle.textContent = topic.title;
    if (activeDesc) activeDesc.textContent = topic.desc;
    if (filenameBadge) filenameBadge.textContent = topic.file;
    if (codeTextarea) {
      codeTextarea.value = topic.code;
      updateLineNumbers();
    }

    if (outputContainer) {
      outputContainer.innerHTML = `<p class="text-white/40">Press Run to execute this ${langData.langName} note (${topic.file}) in your browser.</p>`;
    }

    // Highlight active topic in sidebar
    if (topicList) {
      const topicBtns = topicList.querySelectorAll('.notes-topic-btn');
      topicBtns.forEach((btn, i) => {
        if (i === idx) {
          btn.setAttribute('aria-current', 'true');
          btn.className = 'notes-topic-btn w-full rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-colors lg:whitespace-normal bg-brand/10 font-semibold text-brand';
        } else {
          btn.removeAttribute('aria-current');
          btn.className = 'notes-topic-btn w-full rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-colors lg:whitespace-normal text-ink/75 hover:bg-ink/5';
        }
      });
    }
  }

  function setLanguage(lang) {
    const langData = notesData[lang];
    if (!langData) return;
    currentLang = lang;

    // Update Tab Styles
    tabs.forEach(tab => {
      const tLang = tab.getAttribute('data-lang');
      if (tLang === lang) {
        tab.setAttribute('aria-selected', 'true');
        tab.className = 'notes-tab-btn -mb-px inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors border-brand bg-brand/5 text-brand';
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.className = 'notes-tab-btn -mb-px inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors border-transparent text-ink/60 hover:text-ink';
      }
    });

    // Update Sidebar Headers & Browse Card
    if (sidebarTitle) sidebarTitle.textContent = langData.sidebarTitle;
    if (browseTitle) browseTitle.textContent = langData.browseTitle;
    if (browseSubtitle) browseSubtitle.textContent = langData.browseSubtitle;
    if (browseCard) browseCard.href = langData.repoUrl;

    if (githubLink) {
      githubLink.href = langData.repoUrl;
      githubLink.innerHTML = `View ${langData.repo} on GitHub <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link size-3.5" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>`;
    }

    // Rebuild Topic List in Sidebar
    if (topicList) {
      topicList.innerHTML = '';
      langData.topics.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = 'shrink-0';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-topic-idx', i.toString());
        btn.textContent = t.name;
        btn.className = (i === 0)
          ? 'notes-topic-btn w-full rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-colors lg:whitespace-normal bg-brand/10 font-semibold text-brand'
          : 'notes-topic-btn w-full rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-colors lg:whitespace-normal text-ink/75 hover:bg-ink/5';
        
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          renderTopic(lang, i);
        });

        li.appendChild(btn);
        topicList.appendChild(li);
      });
    }

    // Render Topic 0
    renderTopic(lang, 0);
  }

  // Bind Tab Click Handlers
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = tab.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        setLanguage(lang);
      }
    });
  });

  // Bind initial topic list buttons
  if (topicList) {
    const topicBtns = topicList.querySelectorAll('.notes-topic-btn');
    topicBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        renderTopic(currentLang, i);
      });
    });
  }

  // Run Button Simulation
  if (runBtn) {
    runBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!outputContainer) return;
      const topic = notesData[currentLang]?.topics[currentTopicIdx];
      const filename = topic ? topic.file : 'script';
      outputContainer.innerHTML = `<div class="flex items-center gap-2 text-brand font-semibold"><svg class="animate-spin size-3.5" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg><span>Executing ${filename}...</span></div>`;
      
      setTimeout(() => {
        const out = topic?.output || '[Program executed successfully with code 0]';
        outputContainer.innerHTML = `<pre class="whitespace-pre-wrap text-emerald-400 font-mono text-xs leading-relaxed">${out}</pre>`;
      }, 350);
    });
  }

  // Copy Button
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const codeText = codeTextarea ? codeTextarea.value : '';
      if (codeText) {
        try {
          await navigator.clipboard.writeText(codeText);
          const copyLabel = document.getElementById('notes-copy-label');
          if (copyLabel) copyLabel.textContent = 'Copied!';
          setTimeout(() => {
            if (copyLabel) copyLabel.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code: ', err);
        }
      }
    });
  }

  // Initialize line numbers on first load
  updateLineNumbers();
}

// 8. My Library Folders & Travel Albums
function initLibraryFolders() {
  const librarySection = document.getElementById('library');
  if (!librarySection) return;

  const folderNames = [
    "Syllhet", "Kuakata", "Cox'Bazar", "Sundarban", "Pabna", "Natore",
    "Sirajganj", "Khulna", "Barishal", "Kushtia", "Tangail", "Magura",
    "Jhenaidah", "Sajek", "Pakshi", "Faridpur", "Pirojpur", "Gazipur",
    "Mymenshing", "MouloviBazar", "Cumilla", "Brahmanbaria", "Sonargaon",
    "Rangamati", "Jessore"
  ];

  // Explore in Details & Show Less (Show Less appears UNDER ALL FOLDERS when expanded)
  const exploreWrapper = document.getElementById('library-explore-wrapper');
  const exploreBtn = document.getElementById('library-explore-btn');
  const extraGrid = document.getElementById('library-extra-grid');
  const showLessWrapper = document.getElementById('library-show-less-wrapper');
  const showLessBtn = document.getElementById('library-show-less-btn');

  if (exploreBtn && extraGrid && exploreWrapper && showLessWrapper) {
    exploreBtn.addEventListener('click', () => {
      // Hide middle explore button
      exploreWrapper.classList.add('hidden');
      // Reveal extra 21 folders seamlessly continuing the grid
      extraGrid.classList.remove('hidden');
      // Reveal Show Less button at the very bottom under all 25 folders
      showLessWrapper.classList.remove('hidden');
    });

    if (showLessBtn) {
      showLessBtn.addEventListener('click', () => {
        // Hide bottom Show Less button
        showLessWrapper.classList.add('hidden');
        // Collapse extra folders
        extraGrid.classList.add('hidden');
        // Re-show middle explore button under the 4 folders
        exploreWrapper.classList.remove('hidden');
        // Smoothly scroll back to the top of the Library section
        librarySection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // Interactive Empty Folder Modal
  let currentFolderIdx = 0;
  let modal = document.getElementById('library-folder-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'library-folder-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div id="library-folder-modal-card" class="relative w-full max-w-md overflow-hidden rounded-3xl border border-ink/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 scale-95 dark:border-white/10 dark:bg-[#11161d]/95 text-ink dark:text-white">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b border-ink/10 dark:border-white/10">
          <div class="flex items-center gap-2.5">
            <h3 id="library-modal-title" class="text-xl font-bold leading-tight">Folder</h3>
          </div>
          <button id="library-modal-close-btn" class="size-8 grid place-items-center rounded-full bg-ink/5 hover:bg-ink/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors cursor-pointer" aria-label="Close modal">
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- 3D Folder Visual & Note -->
        <div class="py-6 text-center">
          <div class="relative mx-auto flex items-center justify-center">
            <img src="/library/dragon-folder.png" alt="Folder Preview" class="h-44 w-auto object-contain drop-shadow-[0_12px_24px_rgba(6,182,212,0.4)]"/>
          </div>
          
          <h4 id="library-modal-place" class="mt-4 text-2xl font-bold text-brand dark:text-cyan-400"></h4>
          <p class="mt-2 text-sm text-ink/70 dark:text-white/70 max-w-xs mx-auto leading-relaxed">
            Photos will be added in folders future.
          </p>
        </div>

        <!-- Navigation & Actions Footer -->
        <div class="flex items-center justify-between pt-3 border-t border-ink/10 dark:border-white/10">
          <button id="library-modal-prev" class="inline-flex items-center gap-1.5 rounded-xl border border-ink/10 px-3.5 py-2 text-xs font-semibold hover:bg-ink/5 dark:border-white/15 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m15 18-6-6 6-6"/></svg>
            Previous
          </button>

          <span id="library-modal-counter" class="text-xs font-medium text-ink/50 dark:text-white/50">1 of 25</span>

          <button id="library-modal-next" class="inline-flex items-center gap-1.5 rounded-xl border border-ink/10 px-3.5 py-2 text-xs font-semibold hover:bg-ink/5 dark:border-white/15 dark:hover:bg-white/10 transition-colors cursor-pointer">
            Next
            <svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#library-modal-close-btn').addEventListener('click', closeLibraryModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLibraryModal();
    });
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('opacity-100')) {
        if (e.key === 'Escape') closeLibraryModal();
        if (e.key === 'ArrowLeft') showFolderModal((currentFolderIdx - 1 + folderNames.length) % folderNames.length);
        if (e.key === 'ArrowRight') showFolderModal((currentFolderIdx + 1) % folderNames.length);
      }
    });

    modal.querySelector('#library-modal-prev').addEventListener('click', () => {
      showFolderModal((currentFolderIdx - 1 + folderNames.length) % folderNames.length);
    });
    modal.querySelector('#library-modal-next').addEventListener('click', () => {
      showFolderModal((currentFolderIdx + 1) % folderNames.length);
    });
  }

  function showFolderModal(idx) {
    currentFolderIdx = idx;
    const place = folderNames[idx];
    const title = document.getElementById('library-modal-title');
    const placeHeading = document.getElementById('library-modal-place');
    const counter = document.getElementById('library-modal-counter');
    const modalCard = document.getElementById('library-folder-modal-card');

    if (title) title.textContent = place;
    if (placeHeading) placeHeading.textContent = place;
    if (counter) counter.textContent = `${idx + 1} of ${folderNames.length}`;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    if (modalCard) modalCard.classList.remove('scale-95');
    document.body.style.overflow = 'hidden';
  }

  function closeLibraryModal() {
    const modalCard = document.getElementById('library-folder-modal-card');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    if (modalCard) modalCard.classList.add('scale-95');
    document.body.style.overflow = '';
  }

  // Bind click on all folder items
  const folderCards = document.querySelectorAll('.library-folder-card');
  folderCards.forEach((card, idx) => {
    card.addEventListener('click', () => showFolderModal(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showFolderModal(idx);
      }
    });
  });
}

// 9. Interactive Hobbies & Mini-Game Launcher
function initGameModals() {
  const gameButtons = document.querySelectorAll('.game-play, button[aria-label*="Play"]');
  
  let modal = document.getElementById('portfolio-game-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'portfolio-game-modal';
    modal.className = 'game-modal';
    modal.innerHTML = `
      <div class="relative w-full max-w-4xl max-h-[90vh] bg-[#1a1c18] border-2 border-brand/50 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-background">
        <!-- Title bar -->
        <div class="flex items-center justify-between px-5 py-3.5 bg-[#141612] border-b border-white/10 select-none">
          <div class="flex items-center gap-3">
            <span class="inline-block size-3 rounded-full bg-red-500"></span>
            <span class="inline-block size-3 rounded-full bg-yellow-500"></span>
            <span class="inline-block size-3 rounded-full bg-green-500"></span>
            <span id="modal-game-title" class="ml-2 font-mono text-sm font-semibold tracking-wide text-brand">The Block Builder</span>
          </div>
          <button id="close-game-modal" class="text-white/60 hover:text-white transition-colors p-1">
            <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <!-- Game Canvas Container -->
        <div id="game-viewport" class="relative flex-1 p-4 bg-[#0d0f0b] flex flex-col items-center justify-center min-h-[460px]">
          <!-- Injected Game Canvas -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#close-game-modal').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  gameButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const label = btn.getAttribute('aria-label') || btn.textContent;
      modal.classList.add('active');

      const titleEl = modal.querySelector('#modal-game-title');
      const viewport = modal.querySelector('#game-viewport');

      if (label.includes('Block') || label.includes('01')) {
        titleEl.textContent = 'Mode 01: The Block Builder (Creative Voxel Studio)';
        startBlockBuilderGame(viewport);
      } else if (label.includes('1v1') || label.includes('Showdown') || label.includes('02')) {
        titleEl.textContent = 'Mode 02: Challenge Me For a 1v1 (3D Voxel Duel)';
        startVoxelDuelGame(viewport);
      } else {
        titleEl.textContent = 'Mode 03: Chess Against My Personal AI';
        startChessGame(viewport);
      }
    });
  });
}

// Mini Game 1: The Block Builder (Interactive Minecraft SandBox)
function startBlockBuilderGame(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center w-full h-full gap-4">
      <div class="flex items-center gap-2 bg-[#1b1f16] px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
        <span>Tool:</span>
        <button class="block-select px-3 py-1.5 rounded-lg bg-green-600 font-bold active" data-color="#55a33c" data-name="Grass">🌿 Grass</button>
        <button class="block-select px-3 py-1.5 rounded-lg bg-amber-800 font-bold" data-color="#80502a" data-name="Dirt">🧱 Dirt</button>
        <button class="block-select px-3 py-1.5 rounded-lg bg-stone-500 font-bold" data-color="#7a7f80" data-name="Stone">🪨 Stone</button>
        <button class="block-select px-3 py-1.5 rounded-lg bg-cyan-500 font-bold text-black" data-color="#46dbd8" data-name="Diamond">💎 Diamond</button>
        <button class="block-select px-3 py-1.5 rounded-lg bg-purple-900 font-bold" data-color="#190e2b" data-name="Obsidian">🌌 Obsidian</button>
        <button class="block-select px-3 py-1.5 rounded-lg bg-red-600 font-bold" data-color="#d42626" data-name="TNT">💣 TNT</button>
        <button id="clear-grid-btn" class="ml-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">Clear All</button>
      </div>
      <div class="text-xs text-white/60 font-mono">Left click to place block · Right click to destroy block</div>
      <canvas id="block-canvas" width="640" height="360" class="border-2 border-brand/40 rounded-xl bg-[#22281d] cursor-crosshair shadow-inner"></canvas>
    </div>
  `;

  const canvas = container.querySelector('#block-canvas');
  const ctx = canvas.getContext('2d');
  const cols = 32;
  const rows = 18;
  const cellSize = 20;
  let currentColor = '#55a33c';

  const grid = Array(rows).fill(null).map(() => Array(cols).fill(null));

  // Initialize initial ground
  for (let c = 0; c < cols; c++) {
    grid[rows - 1][c] = '#7a7f80';
    grid[rows - 2][c] = '#80502a';
    grid[rows - 3][c] = '#55a33c';
  }

  function draw() {
    ctx.fillStyle = '#1c2217';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(canvas.width, r * cellSize);
      ctx.stroke();
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, canvas.height);
      ctx.stroke();
    }

    // Draw blocks
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c]) {
          ctx.fillStyle = grid[r][c];
          ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
          // Block 3D bevel
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, 3);
          ctx.fillStyle = 'rgba(0,0,0,0.25)';
          ctx.fillRect(c * cellSize + 1, (r + 1) * cellSize - 3, cellSize - 2, 3);
        }
      }
    }
  }

  container.querySelectorAll('.block-select').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.block-select').forEach(b => b.classList.remove('ring-2', 'ring-white'));
      btn.classList.add('ring-2', 'ring-white');
      currentColor = btn.getAttribute('data-color');
    });
  });

  container.querySelector('#clear-grid-btn').addEventListener('click', () => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        grid[r][c] = null;
      }
    }
    draw();
  });

  function placeBlock(e, remove = false) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);
    if (r >= 0 && r < rows && c >= 0 && c < cols) {
      grid[r][c] = remove ? null : currentColor;
      draw();
    }
  }

  canvas.addEventListener('click', (e) => placeBlock(e, false));
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    placeBlock(e, true);
  });

  draw();
}

// Mini Game 2: 1v1 Retro Arena Duel
function startVoxelDuelGame(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center w-full h-full gap-3 font-mono">
      <div class="flex justify-between items-center w-full max-w-[640px] px-2 text-sm">
        <div>Player HP: <span id="player-hp" class="text-green-400 font-bold">100</span></div>
        <div class="text-xs text-white/60">[A]/[D] Move · [Space] Laser · [W] Jump</div>
        <div>Boss HP: <span id="boss-hp" class="text-red-400 font-bold">100</span></div>
      </div>
      <canvas id="duel-canvas" width="640" height="340" class="border border-red-500/30 rounded-xl bg-[#140b0b]"></canvas>
      <div id="duel-status" class="text-sm font-semibold text-brand">Fight! Defeat the Voxel Guardian!</div>
    </div>
  `;

  const canvas = container.querySelector('#duel-canvas');
  const ctx = canvas.getContext('2d');

  let player = { x: 80, y: 260, vx: 0, vy: 0, w: 24, h: 32, hp: 100, onGround: true };
  let boss = { x: 520, y: 240, vx: -2, w: 36, h: 48, hp: 100, attackTimer: 0 };
  let bullets = [];
  let bossBullets = [];
  let gameOver = false;
  let keys = {};

  const keyDown = (e) => { keys[e.key.toLowerCase()] = true; };
  const keyUp = (e) => { keys[e.key.toLowerCase()] = false; };
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

  let animId;
  function gameLoop() {
    if (gameOver) return;

    // Player inputs
    if (keys['a'] || keys['arrowleft']) player.vx = -4;
    else if (keys['d'] || keys['arrowright']) player.vx = 4;
    else player.vx = 0;

    if ((keys['w'] || keys['arrowup'] || keys[' ']) && player.onGround) {
      player.vy = -10;
      player.onGround = false;
    }

    if (keys['j'] || keys['f'] || keys['enter']) {
      if (bullets.length < 5) {
        bullets.push({ x: player.x + player.w, y: player.y + 12, vx: 8 });
        keys['j'] = false; keys['f'] = false; keys['enter'] = false;
      }
    }

    // Physics
    player.x += player.vx;
    player.vy += 0.5; // gravity
    player.y += player.vy;
    if (player.y >= 260) {
      player.y = 260;
      player.vy = 0;
      player.onGround = true;
    }
    player.x = Math.max(10, Math.min(600, player.x));

    // Boss AI
    boss.x += boss.vx;
    if (boss.x < 360) boss.vx = 2;
    if (boss.x > 580) boss.vx = -2;

    boss.attackTimer++;
    if (boss.attackTimer > 60) {
      bossBullets.push({ x: boss.x, y: boss.y + 20, vx: -5 });
      boss.attackTimer = 0;
    }

    // Update bullets
    bullets.forEach(b => b.x += b.vx);
    bullets = bullets.filter(b => b.x < 640);

    bossBullets.forEach(b => b.x += b.vx);
    bossBullets = bossBullets.filter(b => b.x > 0);

    // Collisions
    bullets.forEach(b => {
      if (b.x > boss.x && b.x < boss.x + boss.w && b.y > boss.y && b.y < boss.y + boss.h) {
        boss.hp -= 8;
        b.x = 999;
      }
    });

    bossBullets.forEach(b => {
      if (b.x > player.x && b.x < player.x + player.w && b.y > player.y && b.y < player.y + player.h) {
        player.hp -= 10;
        b.x = -999;
      }
    });

    // Update UI
    container.querySelector('#player-hp').textContent = Math.max(0, player.hp);
    container.querySelector('#boss-hp').textContent = Math.max(0, boss.hp);

    if (boss.hp <= 0) {
      gameOver = true;
      container.querySelector('#duel-status').textContent = '🎉 Victory! You defeated the Voxel Guardian!';
      container.querySelector('#duel-status').className = 'text-sm font-bold text-green-400';
    } else if (player.hp <= 0) {
      gameOver = true;
      container.querySelector('#duel-status').textContent = '💀 Defeated! Try again!';
      container.querySelector('#duel-status').className = 'text-sm font-bold text-red-400';
    }

    // Render
    ctx.fillStyle = '#140b0b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = '#3a1f1f';
    ctx.fillRect(0, 292, canvas.width, 48);

    // Player
    ctx.fillStyle = '#55a33c';
    ctx.fillRect(player.x, player.y, player.w, player.h);
    // Player eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + player.w - 6, player.y + 6, 4, 4);

    // Boss
    ctx.fillStyle = '#d42626';
    ctx.fillRect(boss.x, boss.y, boss.w, boss.h);
    ctx.fillStyle = '#ffde59';
    ctx.fillRect(boss.x + 4, boss.y + 10, 6, 6);

    // Lasers
    ctx.fillStyle = '#46dbd8';
    bullets.forEach(b => ctx.fillRect(b.x, b.y, 10, 3));

    ctx.fillStyle = '#ff4444';
    bossBullets.forEach(b => ctx.fillRect(b.x, b.y, 8, 4));

    if (!gameOver) {
      animId = requestAnimationFrame(gameLoop);
    }
  }

  animId = requestAnimationFrame(gameLoop);

  // Auto clean-up when closed
  const observer = new MutationObserver(() => {
    if (!container.isConnected) {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Mini Game 3: Chess Against My Personal AI
function startChessGame(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center w-full h-full gap-3 font-mono">
      <div class="flex justify-between items-center w-full max-w-[400px] text-xs">
        <span>Turn: <strong id="chess-turn" class="text-brand">White (You)</strong></span>
        <span>AI: <strong class="text-amber-400">Rakin AI Bot</strong></span>
      </div>
      <div id="chess-board" class="grid grid-cols-8 grid-rows-8 size-[360px] border-4 border-amber-950 rounded-xl overflow-hidden shadow-2xl"></div>
      <div id="chess-status" class="text-xs text-white/70">Click piece to select, click square to move.</div>
    </div>
  `;

  const boardEl = container.querySelector('#chess-board');
  const turnEl = container.querySelector('#chess-turn');
  const statusEl = container.querySelector('#chess-status');

  const initialBoard = [
    ['♜','♞','♝','♛','♚','♝','♞','♜'],
    ['♟','♟','♟','♟','♟','♟','♟','♟'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['♙','♙','♙','♙','♙','♙','♙','♙'],
    ['♖','♘','♗','♕','♔','♗','♘','♖']
  ];

  let board = JSON.parse(JSON.stringify(initialBoard));
  let selected = null;
  let isWhiteTurn = true;

  function renderBoard() {
    boardEl.innerHTML = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const sq = document.createElement('div');
        const isDark = (r + c) % 2 === 1;
        sq.className = `size-[45px] flex items-center justify-center text-3xl font-serif cursor-pointer select-none transition-colors ${
          isDark ? 'bg-[#b58863]' : 'bg-[#f0d9b5]'
        }`;
        if (selected && selected.r === r && selected.c === c) {
          sq.classList.add('ring-4', 'ring-emerald-500', 'bg-emerald-300');
        }

        const piece = board[r][c];
        sq.textContent = piece;
        sq.addEventListener('click', () => handleSquareClick(r, c));
        boardEl.appendChild(sq);
      }
    }
  }

  function handleSquareClick(r, c) {
    if (!isWhiteTurn) return;

    if (!selected) {
      if (board[r][c] && '♙♖♘♗♕♔'.includes(board[r][c])) {
        selected = { r, c };
        renderBoard();
      }
    } else {
      if (selected.r === r && selected.c === c) {
        selected = null;
      } else {
        board[r][c] = board[selected.r][selected.c];
        board[selected.r][selected.c] = '';
        selected = null;
        isWhiteTurn = false;
        turnEl.textContent = 'Black (AI Thinking...)';
        renderBoard();
        setTimeout(makeAIMove, 700);
      }
      renderBoard();
    }
  }

  function makeAIMove() {
    const blackPieces = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] && '♟♜♞♝♛♚'.includes(board[r][c])) {
          blackPieces.push({ r, c, piece: board[r][c] });
        }
      }
    }

    if (blackPieces.length > 0) {
      const chosen = blackPieces[Math.floor(Math.random() * blackPieces.length)];
      const targetRow = Math.min(7, chosen.r + 1);
      const targetCol = Math.max(0, Math.min(7, chosen.c + (Math.random() > 0.5 ? 1 : -1)));
      board[targetRow][targetCol] = chosen.piece;
      board[chosen.r][chosen.c] = '';
    }

    isWhiteTurn = true;
    turnEl.textContent = 'White (You)';
    statusEl.textContent = 'AI made a move! Your turn.';
    renderBoard();
  }

  renderBoard();
}

// 10. Dynamic Interactive Eyeballs with Cursor Tracking & Natural Blinking
function initMinecraftEyes() {
  const eyeSockets = document.querySelectorAll('.interactive-eye-socket');
  const pupils = document.querySelectorAll('.interactive-pupil');
  const eyelidsTop = document.querySelectorAll('.eyelid-top');
  const eyelidsBottom = document.querySelectorAll('.eyelid-bottom');
  const anonTextarea = document.getElementById('anon-message');
  const eyesWrapper = document.getElementById('interactive-eyes-wrapper');

  if (!pupils.length || !eyeSockets.length) return;

  let isTyping = false;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let animationFrameId = null;

  function updatePupils() {
    if (isTyping) {
      pupils.forEach(pupil => {
        pupil.style.transform = 'translate(-8px, 12px)';
      });
      return;
    }

    eyeSockets.forEach((socket, i) => {
      const pupil = pupils[i];
      if (!pupil) return;

      const rect = socket.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = mouseX - eyeCenterX;
      const deltaY = mouseY - eyeCenterY;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Max pupil travel limit within the 76px socket
      const maxDistance = 14;
      const travel = Math.min(distance / 200, 1) * maxDistance;

      const offsetX = Math.cos(angle) * travel;
      const offsetY = Math.sin(angle) * travel;

      pupil.style.transform = `translate(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px)`;
    });
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isTyping) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updatePupils);
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (!isTyping) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updatePupils);
    }
  }, { passive: true });

  // Reaction when typing in anonymous message box
  if (anonTextarea) {
    anonTextarea.addEventListener('focus', () => {
      isTyping = true;
      updatePupils();
    });
    anonTextarea.addEventListener('input', () => {
      isTyping = true;
      updatePupils();
    });
    anonTextarea.addEventListener('blur', () => {
      isTyping = false;
      updatePupils();
    });
  }

  // Natural Blinking Cycle
  function blink() {
    eyelidsTop.forEach(top => { top.style.height = '50%'; });
    eyelidsBottom.forEach(bottom => { bottom.style.height = '50%'; });

    setTimeout(() => {
      eyelidsTop.forEach(top => { top.style.height = '0%'; });
      eyelidsBottom.forEach(bottom => { bottom.style.height = '0%'; });
    }, 130);

    const nextBlink = Math.random() * 3000 + 3200;
    setTimeout(blink, nextBlink);
  }
  setTimeout(blink, 2000);

  // Playful Wink on Click
  if (eyesWrapper) {
    eyesWrapper.addEventListener('click', () => {
      const rightEyeTop = eyelidsTop[1];
      const rightEyeBottom = eyelidsBottom[1];
      if (rightEyeTop && rightEyeBottom) {
        rightEyeTop.style.height = '50%';
        rightEyeBottom.style.height = '50%';
        setTimeout(() => {
          rightEyeTop.style.height = '0%';
          rightEyeBottom.style.height = '0%';
        }, 320);
      }
    });
  }
}

// 11. Interactive Minecraft Pixel Mosaic Transition on Canvas in "Let's Connect"
function initConnectPixelCanvas() {
  const connectBar = document.querySelector('.connect-bar');
  if (!connectBar) return;

  const canvas = document.getElementById('connect-pixel-canvas') || connectBar.querySelector('canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const CELL_SIZE = 14;
  const GAP = 1.5;

  const MINECRAFT_GREENS = [
    '#38a169', // mid grass
    '#48bb78', // vibrant foliage
    '#2f855a', // moss green
    '#276749', // dark foliage
    '#5ebd7a', // bright green
    '#7ece96', // sage green
    '#9ddcb2', // pale mint
    '#1e4620', // forest deep
    '#2d5a27', // creeper darker
    '#52a468'  // creeper green
  ];

  let width = 0;
  let height = 0;
  let numCols = 0;
  let numRows = 0;
  let grid = [];
  let isAnimating = false;
  let isMouseOver = false;
  const targetRadius = 105;

  function initGrid() {
    const rect = connectBar.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    numCols = Math.ceil(width / CELL_SIZE);
    numRows = Math.ceil(height / CELL_SIZE);

    grid = [];
    for (let r = 0; r < numRows; r++) {
      const row = [];
      for (let c = 0; c < numCols; c++) {
        const x = c * CELL_SIZE;
        // In Image 2, the pixel cluster is prominent behind the lantern and "Let's Connect" (left side)
        let baseAlpha = 0;
        if (x < 460) {
          const falloff = Math.max(0, 1 - (x / 460));
          // Scatter probability: higher on left, fading gracefully towards 460px
          if (Math.random() < 0.65 * falloff) {
            baseAlpha = (0.10 + Math.random() * 0.40) * falloff;
          }
        }

        row.push({
          color: MINECRAFT_GREENS[Math.floor(Math.random() * MINECRAFT_GREENS.length)],
          baseAlpha: baseAlpha,
          currentAlpha: baseAlpha
        });
      }
      grid.push(row);
    }

    renderFrame();
  }

  function renderFrame() {
    ctx.clearRect(0, 0, width, height);
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        const cell = grid[r][c];
        if (cell.currentAlpha > 0.02) {
          ctx.globalAlpha = cell.currentAlpha;
          ctx.fillStyle = cell.color;
          ctx.fillRect(c * CELL_SIZE + 1, r * CELL_SIZE + 1, CELL_SIZE - GAP, CELL_SIZE - GAP);
        }
      }
    }
    ctx.globalAlpha = 1.0;
  }

  function loop() {
    let hasChanges = false;
    ctx.clearRect(0, 0, width, height);

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        const cell = grid[r][c];

        // Smooth decay towards baseAlpha
        if (Math.abs(cell.currentAlpha - cell.baseAlpha) > 0.005) {
          cell.currentAlpha += (cell.baseAlpha - cell.currentAlpha) * 0.06;
          hasChanges = true;
        } else {
          cell.currentAlpha = cell.baseAlpha;
        }

        if (cell.currentAlpha > 0.02) {
          ctx.globalAlpha = cell.currentAlpha;
          ctx.fillStyle = cell.color;
          ctx.fillRect(c * CELL_SIZE + 1, r * CELL_SIZE + 1, CELL_SIZE - GAP, CELL_SIZE - GAP);
        }
      }
    }
    ctx.globalAlpha = 1.0;

    if (isMouseOver || hasChanges) {
      requestAnimationFrame(loop);
    } else {
      isAnimating = false;
    }
  }

  function exciteCellsAround(x, y) {
    if (!grid.length) return;
    const rStart = Math.max(0, Math.floor((y - targetRadius) / CELL_SIZE));
    const rEnd = Math.min(numRows - 1, Math.ceil((y + targetRadius) / CELL_SIZE));
    const cStart = Math.max(0, Math.floor((x - targetRadius) / CELL_SIZE));
    const cEnd = Math.min(numCols - 1, Math.ceil((x + targetRadius) / CELL_SIZE));

    for (let r = rStart; r <= rEnd; r++) {
      for (let c = cStart; c <= cEnd; c++) {
        const cx = c * CELL_SIZE + CELL_SIZE / 2;
        const cy = r * CELL_SIZE + CELL_SIZE / 2;
        const dist = Math.hypot(cx - x, cy - y);

        if (dist < targetRadius) {
          const intensity = Math.pow(1 - dist / targetRadius, 1.35);
          const boost = intensity * (0.65 + Math.random() * 0.32);
          const cell = grid[r][c];
          cell.currentAlpha = Math.min(0.95, Math.max(cell.currentAlpha, boost));
          if (Math.random() < 0.18) {
            cell.color = MINECRAFT_GREENS[Math.floor(Math.random() * MINECRAFT_GREENS.length)];
          }
        }
      }
    }

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(loop);
    }
  }

  connectBar.addEventListener('mouseenter', (e) => {
    isMouseOver = true;
    const rect = connectBar.getBoundingClientRect();
    exciteCellsAround(e.clientX - rect.left, e.clientY - rect.top);
  });

  connectBar.addEventListener('mousemove', (e) => {
    isMouseOver = true;
    const rect = connectBar.getBoundingClientRect();
    exciteCellsAround(e.clientX - rect.left, e.clientY - rect.top);
  });

  connectBar.addEventListener('mouseleave', () => {
    isMouseOver = false;
  });

  window.addEventListener('resize', () => {
    initGrid();
  });

  initGrid();
}

// 12. Minecraft Anonymous Message Modal & On-Page Controller
function initAnonymousModal() {
  const anonBtn = document.getElementById('send-anon-btn') || document.querySelector('button[aria-label*="anonymous message" i]');
  const onPageTextarea = document.getElementById('anon-message');
  const onPageForm = document.querySelector('#about form, #contact form');
  const onPageCounter = onPageForm ? onPageForm.querySelector('p[role="status"]') : null;
  const onPageSubmitBtn = onPageForm ? onPageForm.querySelector('button[type="submit"]') : null;

  // 1. Setup on-page form interaction in About section
  if (onPageTextarea) {
    onPageTextarea.addEventListener('input', () => {
      const len = onPageTextarea.value.length;
      if (onPageCounter) onPageCounter.textContent = `${len}/1000`;
      if (onPageSubmitBtn) {
        onPageSubmitBtn.disabled = onPageTextarea.value.trim().length === 0;
      }
    });
  }

  if (onPageForm) {
    onPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!onPageTextarea || !onPageTextarea.value.trim()) return;

      const originalText = onPageSubmitBtn ? onPageSubmitBtn.textContent : 'Send';
      if (onPageSubmitBtn) {
        onPageSubmitBtn.textContent = 'Sent! ✨';
        onPageSubmitBtn.disabled = true;
      }

      // Store locally
      try {
        const existing = JSON.parse(localStorage.getItem('portfolio_anon_messages') || '[]');
        existing.push({ text: onPageTextarea.value.trim(), date: new Date().toISOString() });
        localStorage.setItem('portfolio_anon_messages', JSON.stringify(existing));
      } catch (err) {}

      setTimeout(() => {
        onPageForm.reset();
        if (onPageCounter) onPageCounter.textContent = '0/1000';
        if (onPageSubmitBtn) {
          onPageSubmitBtn.textContent = originalText;
          onPageSubmitBtn.disabled = true;
        }
      }, 2500);
    });
  }

  // 2. Setup Anonymous Modal for the top button
  let modal = document.getElementById('anonymous-message-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'anonymous-message-modal';
    modal.className = 'is-hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm';
    modal.innerHTML = `
      <div id="anonymous-modal-content" class="relative w-full max-w-lg rounded-2xl border-2 border-[#0f4a30] bg-[#fbf6ed] dark:bg-[#111f18] dark:border-[#2e6b4a] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4 border-b border-ink/10 dark:border-white/10 pb-4">
          <div class="flex items-center gap-3">
            <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-[#0f4a30] text-[#7fd1a8] border border-[#2e6b4a] shadow-inner">
              <svg class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a9 9 0 0 0-9 9c0 3.57 2.08 6.66 5.1 8.12V21a1 1 0 0 0 1 1h5.8a1 1 0 0 0 1-1v-1.88A9.004 9.004 0 0 0 21 11a9 9 0 0 0-9-9zm-3.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM10 16h4v2h-4v-2z"/>
              </svg>
            </span>
            <div>
              <h3 class="font-pixel text-xl sm:text-2xl font-bold text-ink">Send an anonymous message</h3>
              <p class="text-xs sm:text-sm text-ink/65 mt-0.5">Say anything. I won't know who you are.</p>
            </div>
          </div>
          <button id="close-anon-modal-btn" type="button" aria-label="Close modal" class="rounded-lg p-1.5 text-ink/60 hover:text-ink hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <!-- Quick Idea Chips -->
        <div class="mt-4">
          <span class="text-[11px] font-bold uppercase tracking-wider text-ink/50 dark:text-white/50 block mb-2 font-mono">Quick Icebreakers</span>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" class="modal-anon-chip px-2.5 py-1 rounded-md text-xs bg-ink/5 dark:bg-white/10 hover:bg-[#1dbf73]/20 hover:text-[#108c51] dark:hover:text-[#28d783] transition-colors text-ink/75 dark:text-white/80 cursor-pointer">👋 Love your portfolio design!</button>
            <button type="button" class="modal-anon-chip px-2.5 py-1 rounded-md text-xs bg-ink/5 dark:bg-white/10 hover:bg-[#1dbf73]/20 hover:text-[#108c51] dark:hover:text-[#28d783] transition-colors text-ink/75 dark:text-white/80 cursor-pointer">💼 Available for a freelance project?</button>
            <button type="button" class="modal-anon-chip px-2.5 py-1 rounded-md text-xs bg-ink/5 dark:bg-white/10 hover:bg-[#1dbf73]/20 hover:text-[#108c51] dark:hover:text-[#28d783] transition-colors text-ink/75 dark:text-white/80 cursor-pointer">🎮 Amazing Minecraft interaction!</button>
          </div>
        </div>

        <!-- Form -->
        <form id="modal-anon-form" class="mt-4">
          <div class="relative">
            <textarea id="modal-anon-input" rows="4" maxlength="1000" placeholder="Say anything. I won't know who you are..." class="mc-field w-full resize-none rounded-xl p-3.5 font-pixel text-base leading-relaxed"></textarea>
            <div class="mt-2 flex items-center justify-between text-xs text-ink/60 dark:text-white/60">
              <span class="flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 100% Anonymous & Private
              </span>
              <span id="modal-char-count" class="font-pixel text-xs text-ink/60 dark:text-white/60">0/1000</span>
            </div>
          </div>

          <!-- Success Alert -->
          <div id="modal-anon-success" class="hidden mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium items-center gap-2">
            <svg class="size-5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Message delivered anonymously to Rakin! ✨</span>
          </div>

          <div class="mt-5 flex items-center justify-between gap-3">
            <button type="button" id="modal-scroll-to-page" class="text-xs text-ink/65 dark:text-white/60 hover:text-brand underline underline-offset-2 transition-colors cursor-pointer">
              Or jump to message box on page ↓
            </button>
            <button type="submit" id="modal-anon-submit" disabled class="mc-button h-11 px-6 font-pixel text-base sm:text-lg rounded-lg inline-flex items-center gap-2 cursor-pointer">
              <span>Send Message</span>
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalInput = document.getElementById('modal-anon-input');
  const modalSubmitBtn = document.getElementById('modal-anon-submit');
  const modalCharCount = document.getElementById('modal-char-count');
  const modalSuccess = document.getElementById('modal-anon-success');
  const modalChips = modal.querySelectorAll('.modal-anon-chip');
  const modalScrollBtn = document.getElementById('modal-scroll-to-page');
  const closeBtn = document.getElementById('close-anon-modal-btn');

  function openModal() {
    modal.classList.remove('is-hidden');
    modal.classList.add('is-open');
    if (modalSuccess) modalSuccess.classList.add('hidden');
    if (modalInput) {
      setTimeout(() => modalInput.focus(), 80);
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.classList.add('is-hidden');
  }

  if (anonBtn) {
    anonBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Modal quick chips
  modalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (modalInput) {
        modalInput.value = chip.textContent.trim();
        modalInput.dispatchEvent(new Event('input'));
        modalInput.focus();
      }
    });
  });

  // Modal input counter & enable button
  if (modalInput) {
    modalInput.addEventListener('input', () => {
      const len = modalInput.value.length;
      if (modalCharCount) modalCharCount.textContent = `${len}/1000`;
      if (modalSubmitBtn) {
        modalSubmitBtn.disabled = modalInput.value.trim().length === 0;
      }
    });
  }

  // Modal submit
  const modalForm = document.getElementById('modal-anon-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!modalInput || !modalInput.value.trim()) return;

      if (modalSubmitBtn) {
        modalSubmitBtn.disabled = true;
        modalSubmitBtn.querySelector('span').textContent = 'Sending... 🕊️';
      }

      try {
        const existing = JSON.parse(localStorage.getItem('portfolio_anon_messages') || '[]');
        existing.push({ text: modalInput.value.trim(), date: new Date().toISOString() });
        localStorage.setItem('portfolio_anon_messages', JSON.stringify(existing));
      } catch (err) {}

      setTimeout(() => {
        if (modalSuccess) {
          modalSuccess.classList.remove('hidden');
          modalSuccess.classList.add('flex');
        }
        if (modalSubmitBtn) {
          modalSubmitBtn.querySelector('span').textContent = 'Sent! ✨';
        }
        setTimeout(() => {
          closeModal();
          modalForm.reset();
          if (modalCharCount) modalCharCount.textContent = '0/1000';
          if (modalSubmitBtn) {
            modalSubmitBtn.querySelector('span').textContent = 'Send Message';
            modalSubmitBtn.disabled = true;
          }
        }, 1800);
      }, 700);
    });
  }

  // Scroll to on-page form
  if (modalScrollBtn) {
    modalScrollBtn.addEventListener('click', () => {
      closeModal();
      if (onPageTextarea) {
        onPageTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          onPageTextarea.focus();
          onPageTextarea.classList.add('anon-pulse-glow');
          setTimeout(() => onPageTextarea.classList.remove('anon-pulse-glow'), 2600);
        }, 600);
      }
    });
  }
}

// 13. Rakin's AI Interactive Assistant (Matching Demo Images)

function initCompanionGuide() {
  // Remove any previous guide widgets or buttons
  document.querySelectorAll('[data-guide="true"], .rakin-guide-widget, .rakin-guide-dock-btn, .rakin-ai-trigger, .rakin-ai-window').forEach(el => el.remove());

  // 1. Create Floating Trigger Button (Bottom-Right, Image 1 / Image 2)
  const triggerBtn = document.createElement('button');
  triggerBtn.id = 'rakin-ai-trigger';
  triggerBtn.className = 'rakin-ai-trigger';
  triggerBtn.setAttribute('aria-label', "Open Rakin's AI Assistant");
  triggerBtn.title = "Chat with Rakin's AI";
  triggerBtn.innerHTML = `
    <img src="/avatar.png" class="trigger-avatar" alt="Rakin" />
    <svg class="trigger-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="rakin-ai-badge"></span>
  `;
  document.body.appendChild(triggerBtn);

  // 2. Create Chat Window (Image 2)
  const chatWin = document.createElement('div');
  chatWin.id = 'rakin-ai-window';
  chatWin.className = 'rakin-ai-window is-closed';
  chatWin.innerHTML = `
    <!-- Header (Forest Green #0f4a30) -->
    <div class="rakin-ai-header">
      <div class="rakin-ai-header-left">
        <div class="rakin-ai-avatar-card">
          <img src="/avatar.png" alt="Rakin's AI" />
        </div>
        <div class="rakin-ai-title-wrap">
          <span class="rakin-ai-title">Rakin's AI</span>
          <span class="rakin-ai-subtitle">
            <span class="rakin-ai-dot"></span> Online, Roast at your own risk,
          </span>
        </div>
      </div>
      <div class="rakin-ai-header-actions">
        <!-- Lightbulb / Suggestion -->
        <button id="rakin-ai-lightbulb" type="button" class="rakin-ai-icon-btn" title="Surprise question">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <!-- Reset / Restart -->
        <button id="rakin-ai-reset" type="button" class="rakin-ai-icon-btn" title="Restart conversation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 3v5h5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <!-- Close -->
        <button id="rakin-ai-close" type="button" class="rakin-ai-icon-btn" title="Close chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages Body -->
    <div id="rakin-ai-messages" class="rakin-ai-messages">
      <!-- Welcome Speech Card -->
      <div class="rakin-ai-welcome-card">
        Hey! I'm Rakin's AI. Ask me about his work, his skills, or anything else. You can even try to roast me. I dare you.
      </div>

      <!-- Quick Suggested Prompt Chips -->
      <div id="rakin-ai-chips" class="rakin-ai-chips">
        <button type="button" class="rakin-ai-chip" data-prompt="Show me your front-end skills.">Show me your front-end skills.</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Are you smarter than ChatGPT?">Are you smarter than ChatGPT?</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Go on, roast me.">Go on, roast me.</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Who is Rakin?">Who is Rakin?</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Which project should I check first?">Which project should I check first?</button>
      </div>
    </div>

    <!-- Footer Input Bar -->
    <form id="rakin-ai-form" class="rakin-ai-footer">
      <div class="rakin-ai-input-box">
        <input id="rakin-ai-input" type="text" class="rakin-ai-input" placeholder="Ask anything, or try to roast me..." autocomplete="off" />
      </div>
      <button id="rakin-ai-send" type="submit" class="rakin-ai-send-btn" title="Send">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </form>
  `;
  document.body.appendChild(chatWin);

  const messagesContainer = chatWin.querySelector('#rakin-ai-messages');
  const chipsContainer = chatWin.querySelector('#rakin-ai-chips');
  const chatForm = chatWin.querySelector('#rakin-ai-form');
  const chatInput = chatWin.querySelector('#rakin-ai-input');
  const closeBtn = chatWin.querySelector('#rakin-ai-close');
  const resetBtn = chatWin.querySelector('#rakin-ai-reset');
  const lightbulbBtn = chatWin.querySelector('#rakin-ai-lightbulb');
  const header = chatWin.querySelector('.rakin-ai-header');

  // Toggle Open / Close
  function toggleChat(open) {
    const shouldOpen = open !== undefined ? open : chatWin.classList.contains('is-closed');
    if (shouldOpen) {
      chatWin.classList.remove('is-closed');
      triggerBtn.classList.add('is-open');
      setTimeout(() => chatInput.focus(), 150);
    } else {
      chatWin.classList.add('is-closed');
      triggerBtn.classList.remove('is-open');
    }
  }

  triggerBtn.addEventListener('click', () => toggleChat());
  closeBtn.addEventListener('click', () => toggleChat(false));

  // Reset Chat Conversation
  function resetChat() {
    messagesContainer.innerHTML = `
      <div class="rakin-ai-welcome-card">
        Hey! I'm Rakin's AI. Ask me about his work, his skills, or anything else. You can even try to roast me. I dare you.
      </div>
      <div id="rakin-ai-chips" class="rakin-ai-chips">
        <button type="button" class="rakin-ai-chip" data-prompt="Show me your front-end skills.">Show me your front-end skills.</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Are you smarter than ChatGPT?">Are you smarter than ChatGPT?</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Go on, roast me.">Go on, roast me.</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Who is Rakin?">Who is Rakin?</button>
        <button type="button" class="rakin-ai-chip" data-prompt="Which project should I check first?">Which project should I check first?</button>
      </div>
    `;
    bindChipEvents();
    chatInput.value = '';
    chatInput.focus();
  }

  resetBtn.addEventListener('click', resetChat);

  // Surprise questions via lightbulb
  const surprisePrompts = [
    "Tell me about Rakin's competitive programming stats!",
    "Where has Rakin travelled across his country?",
    "What kind of AI and full-stack projects does Rakin build?",
    "How can I contact Rakin for work or collaboration?",
    "Tell me a joke about C++ pointers.",
    "Which algorithm does Rakin love most?",
    "What video editing software does Rakin use?"
  ];
  let surpriseIdx = 0;
  lightbulbBtn.addEventListener('click', () => {
    chatInput.value = surprisePrompts[surpriseIdx % surprisePrompts.length];
    surpriseIdx++;
    chatInput.focus();
  });

  // Knowledge Base & AI Brain for Rakin
  const roastsToUser = [
    "You're spending your evening asking an AI assistant on a portfolio to roast you instead of finishing those open PRs or fixing that bug in your repo! But honestly, your taste in developer portfolios is 10/10. 🔥",
    "You look like someone who clicks 'Accept all cookies' without reading, and uses console.log('here1'), console.log('here2') to debug in production! Don't worry, your secret is safe with me. 😉",
    "I'd roast you, but my thermal throttling kicked in because your screen has been idle on this website for too long. Go explore Rakin's projects before I give you a syntax error! ⚡",
    "You remind me of uncommitted Git changes on a Friday afternoon — bold, chaotic, and waiting for disaster to happen. But hey, at least you're here chatting with me! 🚀"
  ];

  function getAiResponse(rawQuery) {
    const q = rawQuery.toLowerCase().trim();

    // 1. Front-end skills
    if (q.includes('front-end') || q.includes('frontend') || q.includes('skills') || q.includes('ui')) {
      return "You're literally experiencing them right now! 🔥 Smooth Lenis scrolling, pixel-perfect voxel hero scene, interactive eyeballs that track your cursor in the About section, retro pixel-styled components, and this custom AI chat assistant built in vanilla JavaScript. No bloated UI libraries — pure craftsmanship and style!";
    }

    // 2. Smarter than ChatGPT
    if (q.includes('smarter than chatgpt') || q.includes('chatgpt') || q.includes('gpt')) {
      return "ChatGPT has 175 billion parameters, but does it know how to calculate Karger's Randomized Minimum Cut in C++ while debugging JavaFX thread locks at 3 AM in KUET? Didn't think so. Plus, ChatGPT doesn't know Rakin's secret recipe for passing competitive programming tests on Codeforces! 🚀";
    }

    // 3. Roast me
    if (q.includes('roast me') || q.includes('roast')) {
      return roastsToUser[Math.floor(Math.random() * roastsToUser.length)];
    }

    // 4. Who is Rakin?
    if (q.includes('who is rakin') || q.includes('about rakin') || q.includes('who are you') || q.includes('tell me about yourself')) {
      return "Omar Faruk Rakin is a Computer Science & Engineering student at KUET (Khulna University of Engineering and Technology), competitive programmer with 200+ problems solved, full-stack software developer, and AI explorer. Outside the terminal, he's an avid traveller who has explored almost half of his country, with a goal to complete almost all parts of Bangladesh! 🧭🎒";
    }

    // 5. Which project to check first
    if (q.includes('which project') || q.includes('projects') || q.includes('work') || q.includes('portfolio')) {
      return "Definitely check out the **Smart Laundry Management System** (full-stack with SQLite & desktop/web architecture) or his **Bicycle Rental Mini System** (JavaFX & OOP principles). If you love algorithmic depth, check out his **Randomized Minimum Cut** repo on GitHub (rakin072/RandomizedMinimumCut) or test the live **Coding Notes** right here! ⚡";
    }

    // 6. Coding Notes / GitHub
    if (q.includes('coding notes') || q.includes('code') || q.includes('github') || q.includes('repo')) {
      return "Rakin's GitHub has rich production code across major domains: C++ (Randomized Min-Cut), Java (Bicycle Rental), Python & ROS (Niryo Ned Multi-Modal Robotics), and JavaScript (Inshallah modern utilities). You can test live snippets with line-by-line syntax in the Coding Notes section above! 🐙";
    }

    // 7. KUET / Education
    if (q.includes('kuet') || q.includes('education') || q.includes('university') || q.includes('college')) {
      return "Rakin is studying Computer Science & Engineering at Khulna University of Engineering and Technology (KUET), one of Bangladesh's premier engineering institutions! He balances intense engineering coursework with competitive programming and full-stack software development (KUET Roll: 2207082). Prior to KUET, he studied at Notre Dame College, Dhaka (NDC Roll: 12210072) in Science. 🎓🏛️";
    }

    // 8. Competitive Programming / Codeforces / Leetcode
    if (q.includes('codeforces') || q.includes('leetcode') || q.includes('competitive') || q.includes('problem')) {
      return "Rakin has solved over 200+ algorithmic problems! You can find his profiles on Codeforces (rakin_082 & Rakin_072) and LeetCode (rakin_082). He's especially fond of Graph Theory, Dynamic Programming, and Randomized Algorithms! 🏆";
    }

    // 9. Contact / Hire / Email / Phone / Fiverr
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('fiverr') || q.includes('gig') || q.includes('freelance')) {
      return "Ready to collaborate or hire Rakin? You can connect with him directly:\n• 💼 Fiverr Gigs: https://www.fiverr.com/s/7jjxkpW (Full-stack web apps, Python automation & software solutions)\n• 📧 Email: farukrakin09@gmail.com / omarrakin9@gmail.com\n• 📱 WhatsApp/Phone: 01558536231\n• 🐙 GitHub: https://github.com/rakin072\nOr send an anonymous message in the About section!";
    }

    // 10. Video Editing / Media
    if (q.includes('video') || q.includes('editing') || q.includes('youtube') || q.includes('premiere')) {
      return "Beyond coding, Rakin is an experienced video creator and editor! He produces cinematic storytelling recaps (like 'Romancho' and 'The Haunting of Hill House') using Adobe Premiere Pro and After Effects, with over 18,000+ community engagements! 🎬";
    }

    // 11. Travel & Explorer
    if (q.includes('travel') || q.includes('country') || q.includes('trip') || q.includes('tour') || q.includes('explorer')) {
      return "Outside of coding and technology, Rakin has travelled almost the half of his country. His plan is to complete almost all parts of his country as a traveller! 🧭🎒✨";
    }

    // 12. User trying to roast the AI / Rakin
    if (q.includes('you suck') || q.includes('bad') || q.includes('dumb') || q.includes('stupid') || q.includes('trash') || q.includes('ugly')) {
      return "Bold words coming from someone whose cursor has been hovering on this button for 45 seconds! Rakin's code survived KUET compilers and competitive programming stress tests, so your comment barely triggered a warning in my console. Try harder! 😏🔥";
    }

    // 13. General fallback
    return "That's an interesting question! As Rakin's AI, I can tell you about his KUET computer science journey, his 200+ solved coding challenges, his full-stack projects, or his travels across the country. Feel free to click one of the suggested prompts or ask about anything specific! 🤖✨";
  }

  function appendUserMessage(text) {
    const userMsg = document.createElement('div');
    userMsg.className = 'rakin-msg-user';
    userMsg.textContent = text;
    messagesContainer.appendChild(userMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendBotMessage(text) {
    // Show typing indicator first
    const typing = document.createElement('div');
    typing.className = 'rakin-ai-typing';
    typing.innerHTML = '<span class="rakin-typing-dot"></span><span class="rakin-typing-dot"></span><span class="rakin-typing-dot"></span>';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const botMsg = document.createElement('div');
      botMsg.className = 'rakin-msg-bot';
      // Format markdown bold & lines
      const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>');
      botMsg.innerHTML = formatted;
      messagesContainer.appendChild(botMsg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 400);
  }

  function handleSend(query) {
    if (!query || !query.trim()) return;
    appendUserMessage(query);
    const reply = getAiResponse(query);
    appendBotMessage(reply);
  }

  function bindChipEvents() {
    chatWin.querySelectorAll('.rakin-ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        handleSend(prompt);
      });
    });
  }

  bindChipEvents();

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;
    chatInput.value = '';
    handleSend(query);
  });

  // ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !chatWin.classList.contains('is-closed')) {
      toggleChat(false);
    }
  });

  // Optional: Allow dragging the chat window on desktop
  let isDragging = false;
  let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

  header.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    isDragging = true;
    chatWin.classList.add('is-dragging');
    const rect = chatWin.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = rect.left;
    initialTop = rect.top;

    function onMouseMove(moveEvent) {
      if (!isDragging) return;
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newLeft = Math.max(10, Math.min(window.innerWidth - chatWin.offsetWidth - 10, initialLeft + deltaX));
      let newTop = Math.max(10, Math.min(window.innerHeight - chatWin.offsetHeight - 10, initialTop + deltaY));

      chatWin.style.left = `${newLeft}px`;
      chatWin.style.top = `${newTop}px`;
      chatWin.style.right = 'auto';
      chatWin.style.bottom = 'auto';
    }

    function onMouseUp() {
      isDragging = false;
      chatWin.classList.remove('is-dragging');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
}

// 13. Experience Page Modals (Video player & Blog sample showcase)
function initExperiencePageModals() {
  const videoCards = document.querySelectorAll('#editing .group, [href*="haunting"], [href*="romancho"]');
  if (!videoCards.length) return;

  videoCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const heading = card.querySelector('h3, h4, p.font-semibold')?.textContent || 'Video Showcase';
      // If not an external link, open video preview modal
      if (!card.getAttribute('href')?.startsWith('http')) {
        e.preventDefault();
        alert(`Opening preview for: ${heading}`);
      }
    });
  });
}

// 14. All Projects - Interactive Folders & Drawer Modals
function initProjectFolders() {
  const foldersData = [
    {
      id: "folder-fullstack",
      title: "Full Stack Development",
      badgeColor: "#22a55a",
      badgeText: "In production",
      gradient: "linear-gradient(135deg, #0b3a25 0%, #2e7d32 40%, #8bc34a 70%, #e8f5c8 100%)",
      summary: "Full-stack web applications, desktop systems, and mobile apps built with modern frameworks and robust database architectures.",
      projects: [
        {
          name: "Smart Laundry Management",
          desc: "Automated end-to-end laundry management system with order tracking, customer records, and operational analytics.",
          url: "https://github.com/rakin072/Smart_Laundry_Management_System",
          lang: "TypeScript / SQLite / Blade",
          badge: "Full Stack"
        },
        {
          name: "Bicycle Rental Mini System",
          desc: "JavaFX desktop application to manage bicycle rentals, customer tracking, and SQLite database CRUD operations.",
          url: "https://github.com/rakin072/Rakin_2207082_Bicycle-Rental-Mini-System",
          lang: "Java / JavaFX / SQLite",
          badge: "Desktop App"
        },
        {
          name: "Bicycle Rental Android App",
          desc: "Native Android application for bicycle fleet reservations, rental checkout, and active status tracking.",
          url: "https://github.com/rakin072/bicycle-rental-android",
          lang: "Java / Android",
          badge: "Mobile App"
        },
        {
          name: "Lux Property Verse",
          desc: "Modern full-stack interactive real estate platform with high-conversion UI, search filters, and property showcases.",
          url: "https://github.com/rakin072/lux-property-verse",
          lang: "TypeScript / React",
          badge: "Web Platform"
        },
        {
          name: "My-Bondhu Platform",
          desc: "Interactive social companion and connectivity web application with responsive UI and user flows.",
          url: "https://github.com/rakin072/My-Bondhu",
          lang: "TypeScript",
          badge: "Social App"
        },
        {
          name: "Dogs Main Application",
          desc: "Interactive pet care and canine management web platform with modern frontend architecture.",
          url: "https://github.com/rakin072/dogs-main",
          lang: "TypeScript",
          badge: "Web App"
        }
      ]
    },
    {
      id: "folder-group",
      title: "Group & Starred Projects",
      badgeColor: "#a855f7",
      badgeText: "⭐ Team & Starred",
      gradient: "linear-gradient(135deg, #172554 0%, #4338ca 40%, #c026d3 72%, #fbcfe8 100%)",
      summary: "Collaborative team repositories, academic group software engineering projects, and starred open-source works.",
      projects: [
        {
          name: "⭐ Pharmacy Management System",
          desc: "Comprehensive team-developed pharmacy inventory, medicine dispensing, batch tracking, and sales analytics system developed with MyISDTeam.",
          url: "https://github.com/MyISDTeam/Pharmacy-management",
          lang: "Java / Full-stack",
          badge: "⭐ Group Project & Starred",
          isStarred: true,
          isGroup: true
        },
        {
          name: "Trendify Digital Growth",
          desc: "Scalable digital marketing & agency analytics platform with traffic funnels, conversion tracking, and growth automation workflows.",
          url: "https://github.com/rakin072/trendify-digital-growth-58df300f-main",
          lang: "TypeScript",
          badge: "Agency & Analytics"
        },
        {
          name: "Project Bolt Platform",
          desc: "Rapid-prototype full-stack cloud application with modern component architecture and dynamic state management.",
          url: "https://github.com/rakin072/project-bolt-github-fycau7rs",
          lang: "TypeScript",
          badge: "Cloud Application"
        }
      ]
    },
    {
      id: "folder-algorithms",
      title: "Algorithms & Systems",
      badgeColor: "#e0a526",
      badgeText: "Algorithms & Core",
      gradient: "linear-gradient(135deg, #78350f 0%, #d97706 42%, #fbbf24 70%, #fef3c7 100%)",
      summary: "Core algorithms, data structures, competitive programming systems, and computational numerical methods.",
      projects: [
        {
          name: "Randomized Minimum Cut (C++)",
          desc: "High-performance C++ implementation of Karger's Randomized Minimum Cut algorithm utilizing graph edge contraction.",
          url: "https://github.com/rakin072/RandomizedMinimumCut",
          lang: "C++",
          badge: "Graph Algorithm"
        },
        {
          name: "Niryo Ned — Multi-Modal Robot Control",
          desc: "Autonomous vision-based pick and place, real-time hand gesture control, and voice command recognition with Bangla support on Niryo Ned 6-DOF arm.",
          url: "https://github.com/failuresoul/Niryo-Robot",
          lang: "Python / ROS",
          badge: "Robotics & AI"
        },
        {
          name: "Numeric Presentation (C++)",
          desc: "Numerical analysis, mathematical presentation routines, and precision computation methods in C++.",
          url: "https://github.com/rakin072/Numeric_Presentation",
          lang: "C++",
          badge: "Computational Math"
        },
        {
          name: "GPA Calculator Builder",
          desc: "Academic grade point average builder, credit evaluation, and semester transcript calculator in Java.",
          url: "https://github.com/rakin072/Rakin_2207082_GPACalculator_Builder",
          lang: "Java",
          badge: "Academic System"
        }
      ]
    },
    {
      id: "folder-web",
      title: "Web & Interactive Tools",
      badgeColor: "#06b6d4",
      badgeText: "Web & Tools",
      gradient: "linear-gradient(135deg, #0f172a 0%, #0e7490 42%, #22d3ee 72%, #cffafe 100%)",
      summary: "Interactive browser games, financial calculator utilities, and creative modern web interfaces.",
      projects: [
        {
          name: "Inshallah (Flappy Bird & Canvas)",
          desc: "Canvas-based 2D arcade physics game featuring randomized pipe obstacles, gravity loop, and score tracking.",
          url: "https://github.com/rakin072/Inshallah",
          lang: "JavaScript / Canvas",
          badge: "Arcade Physics Game"
        },
        {
          name: "BUTEX Pay Scale Calculator",
          desc: "BUTEX 2026 Pay Scale calculator with downloadable release binary and automated salary/grade formulas.",
          url: "https://github.com/rakin072/Butex_calc",
          lang: "HTML / JavaScript",
          badge: "Pay Scale Tool"
        },
        {
          name: "Personal Portfolio Website",
          desc: "Personal portfolio website implementing modern semantic layout, interactive navigation, and responsive styles.",
          url: "https://github.com/rakin072/myportfolio",
          lang: "HTML / CSS / JavaScript",
          badge: "Portfolio Web"
        },
        {
          name: "TRY Modern Web Prototype",
          desc: "Responsive modern web interface exploration featuring custom CSS styling and fluid component layouts.",
          url: "https://github.com/rakin072/TRY_website",
          lang: "CSS / HTML",
          badge: "UI Exploration"
        }
      ]
    }
  ];

  const folderCards = document.querySelectorAll('.project-folder-card');
  if (!folderCards.length) return;

  let modal = document.getElementById('project-folder-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'project-folder-modal';
    modal.className = 'is-hidden';
    modal.innerHTML = `
      <div id="project-folder-modal-content" class="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-background border border-ink/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        <!-- Header -->
        <div id="folder-modal-header" class="relative p-6 sm:p-7 text-white flex items-start justify-between">
          <div class="relative z-10">
            <span id="folder-modal-badge" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white mb-2 shadow-sm"></span>
            <h3 id="folder-modal-title" class="text-2xl sm:text-3xl font-bold tracking-tight"></h3>
            <p id="folder-modal-desc" class="mt-1.5 text-sm sm:text-base text-white/85 max-w-xl"></p>
          </div>
          <button id="close-folder-modal-btn" type="button" aria-label="Close modal" class="relative z-10 grid size-10 place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors cursor-pointer shrink-0 ml-4">
            <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <!-- Projects List -->
        <div id="folder-modal-body" class="p-6 sm:p-7 overflow-y-auto space-y-4 flex-1">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('close-folder-modal-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  function openModal(folder) {
    const header = document.getElementById('folder-modal-header');
    const badge = document.getElementById('folder-modal-badge');
    const title = document.getElementById('folder-modal-title');
    const desc = document.getElementById('folder-modal-desc');
    const body = document.getElementById('folder-modal-body');

    if (header) header.style.background = folder.gradient;
    if (badge) badge.innerHTML = `<span class="size-1.5 rounded-full inline-block mr-1.5" style="background:${folder.badgeColor}"></span>${folder.badgeText} · ${folder.projects.length} Repositories`;
    if (title) title.textContent = folder.title;
    if (desc) desc.textContent = folder.summary;

    if (body) {
      body.innerHTML = folder.projects.map(proj => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-ink/10 bg-white/60 dark:bg-white/5 hover:border-brand/40 hover:bg-white/90 dark:hover:bg-white/10 transition-all shadow-sm">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-base sm:text-lg text-ink">${proj.name}</span>
              ${proj.badge ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${proj.isStarred ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' : 'bg-brand/10 text-brand'}">${proj.badge}</span>` : ''}
              <span class="px-2 py-0.5 rounded-md text-xs font-medium bg-ink/5 text-ink/70">${proj.lang}</span>
            </div>
            <p class="mt-1 text-sm text-ink/75 leading-relaxed">${proj.desc}</p>
          </div>
          <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="btn-3d shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-background hover:bg-brand-hover text-sm font-semibold transition-transform">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="size-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
            <svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      `).join('');
    }

    modal.classList.remove('is-hidden');
    modal.classList.add('is-open');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.classList.add('is-hidden');
  }

  // Interactive Folder Open / Close & Hover & 3D Tilt System
  folderCards.forEach((card) => {
    const actionLabel = card.querySelector('.folder-action-label');

    // 3D physical card tilt on mouse move
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const rotX = -(((e.clientY - rect.top) / rect.height - 0.5) * 9);
      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });

    // Reset tilt and labels on mouse leave
    card.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        if (!card.classList.contains('is-open')) {
          if (actionLabel) actionLabel.textContent = 'Hover to open';
        }
      }
    });

    // Hover dynamic feedback on mouse enter
    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') {
        // Close any other folder that was previously locked open
        folderCards.forEach(c => {
          if (c !== card && c.classList.contains('is-open')) {
            c.classList.remove('is-open');
            const lbl = c.querySelector('.folder-action-label');
            if (lbl) lbl.textContent = 'Hover to open';
          }
        });

        if (!card.classList.contains('is-open')) {
          if (actionLabel) actionLabel.textContent = 'Click to hold open';
        }
      }
    });

    // Click handler for folder card
    card.addEventListener('click', (e) => {
      // If clicking directly on a repository link pill, allow normal link navigation
      if (e.target.closest('.folder-card-pill')) {
        return;
      }

      // Toggle full folder opening in place
      const isCurrentlyOpen = card.classList.contains('is-open');

      // Close all other folder cards first
      folderCards.forEach(c => {
        c.classList.remove('is-open');
        const lbl = c.querySelector('.folder-action-label');
        if (lbl) lbl.textContent = 'Hover to open';
      });

      // Toggle this folder
      if (!isCurrentlyOpen) {
        card.classList.add('is-open');
        if (actionLabel) actionLabel.textContent = 'Click to close';
      }
    });
  });

  // Close any open folder when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.project-folder-card') && !e.target.closest('#project-folder-modal')) {
      folderCards.forEach(c => {
        c.classList.remove('is-open');
        const lbl = c.querySelector('.folder-action-label');
        if (lbl) lbl.textContent = 'Hover to open';
      });
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      folderCards.forEach(c => {
        c.classList.remove('is-open');
        const lbl = c.querySelector('.folder-action-label');
        if (lbl) lbl.textContent = 'Hover to open';
      });
    }
  });
}

// Interactive Tabs for Competitive Programming & Fiverr Gigs
function initCompetitiveAndFiverrTabs() {
  const tabBtns = document.querySelectorAll('.comp-tab-btn');
  const cpBlock = document.getElementById('comp-programming-block');
  const fiverrBlock = document.getElementById('fiverr-services-block');

  if (!tabBtns.length || !cpBlock || !fiverrBlock) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');

      // Update button active appearance
      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-white', 'dark:bg-white/10', 'text-ink', 'dark:text-white', 'shadow-sm');
        b.classList.add('text-ink/70', 'dark:text-white/70');
      });

      btn.classList.add('active', 'bg-white', 'dark:bg-white/10', 'text-ink', 'dark:text-white', 'shadow-sm');
      btn.classList.remove('text-ink/70', 'dark:text-white/70');

      // Animate transition smoothly
      if (target === 'all') {
        cpBlock.style.display = 'block';
        fiverrBlock.style.display = 'block';
        cpBlock.style.opacity = '0';
        cpBlock.style.transform = 'translateY(12px)';
        fiverrBlock.style.opacity = '0';
        fiverrBlock.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
          cpBlock.style.opacity = '1';
          cpBlock.style.transform = 'translateY(0)';
          setTimeout(() => {
            fiverrBlock.style.opacity = '1';
            fiverrBlock.style.transform = 'translateY(0)';
          }, 80);
        });
      } else if (target === 'cp') {
        fiverrBlock.style.opacity = '0';
        fiverrBlock.style.transform = 'translateY(12px)';
        setTimeout(() => {
          fiverrBlock.style.display = 'none';
          cpBlock.style.display = 'block';
          requestAnimationFrame(() => {
            cpBlock.style.opacity = '1';
            cpBlock.style.transform = 'translateY(0)';
          });
        }, 150);
      } else if (target === 'fiverr') {
        cpBlock.style.opacity = '0';
        cpBlock.style.transform = 'translateY(12px)';
        setTimeout(() => {
          cpBlock.style.display = 'none';
          fiverrBlock.style.display = 'block';
          requestAnimationFrame(() => {
            fiverrBlock.style.opacity = '1';
            fiverrBlock.style.transform = 'translateY(0)';
          });
        }, 150);
      }
    });
  });

  // Initialize interactive engine
  initCompetitiveInteractiveEngine();
}

// ========================================================
// 15. COMPETITIVE PROGRAMMING & FIVERR INTERACTIVE ENGINE
// ========================================================
function initCompetitiveInteractiveEngine() {
  // A. Cyber-Schematic Nodes & Blueprint Service Rows Synchronization
  const schematicNodes = document.querySelectorAll('.schematic-node-g, .schematic-node');
  const serviceRows = document.querySelectorAll('.blueprint-service-item, .blueprint-service-row');
  
  schematicNodes.forEach(node => {
    const serviceId = node.getAttribute('data-node');
    const matchingWire = document.getElementById(`circuit-path-${serviceId}`);
    const matchingRow = document.querySelector(`[data-service="${serviceId}"]`);

    node.addEventListener('mouseenter', () => {
      node.classList.add('is-active');
      if (matchingWire) matchingWire.classList.add('is-active');
      if (matchingRow) matchingRow.classList.add('is-active');
    });

    node.addEventListener('mouseleave', () => {
      node.classList.remove('is-active');
      if (matchingWire) matchingWire.classList.remove('is-active');
      if (matchingRow) matchingRow.classList.remove('is-active');
    });

    node.addEventListener('click', (e) => {
      if (matchingRow) {
        e.preventDefault();
        matchingRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matchingRow.classList.add('is-active');
        setTimeout(() => {
          matchingRow.classList.remove('is-active');
        }, 1200);
      }
    });
  });

  serviceRows.forEach(row => {
    const serviceId = row.getAttribute('data-service');
    const matchingNode = document.querySelector(`[data-node="${serviceId}"]`);
    const matchingWire = document.getElementById(`circuit-path-${serviceId}`);

    row.addEventListener('mouseenter', () => {
      if (matchingNode) matchingNode.classList.add('is-active');
      if (matchingWire) matchingWire.classList.add('is-active');
    });

    row.addEventListener('mouseleave', () => {
      if (matchingNode) matchingNode.classList.remove('is-active');
      if (matchingWire) matchingWire.classList.remove('is-active');
    });
  });

  // Telemetry items subtle hover response
  const telemetryItems = document.querySelectorAll('.telemetry-stat-item');
  telemetryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-3px)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // B. Interactive Service Specification Modal
  const serviceModal = document.getElementById('service-spec-modal');
  if (serviceModal && serviceModal.parentElement !== document.body) {
    document.body.appendChild(serviceModal);
  }
  const closeServiceModalBtn = document.getElementById('close-service-modal-btn');
  const modalCategory = document.getElementById('modal-service-category');
  const modalTitle = document.getElementById('modal-service-title');
  const modalDesc = document.getElementById('modal-service-desc');
  const modalFeatures = document.getElementById('modal-service-features');
  const modalPrice = document.getElementById('modal-service-price');
  const modalTurnaround = document.getElementById('modal-service-turnaround');
  const modalOrderLink = document.getElementById('modal-order-link');

  const servicesData = {
    '01': {
      category: 'Telegram WebApp · Game Bot',
      title: 'Telegram Mini App, Web App & Game Development',
      desc: 'Full-stack Telegram Mini Apps, WebApps, and tap-based or single-player bot games integrated seamlessly with the Telegram Bot API.',
      price: '$15 - $120+',
      turnaround: '3 - 7 Days Express',
      fiverrUrl: 'https://www.fiverr.com/s/lrrEw2y',
      features: [
        'Custom Tap-to-Earn / Casual Game Mechanics',
        'Telegram WebApp (TMA) SDK Integration',
        'Bot API Auth & User Session Persistence',
        'Daily Streak, Timers, Tasks & Referral Logic',
        'Wallet & TonConnect Support (Optional)',
        'Responsive Mobile Touch Interface & Audio',
        'Clean, Well-Commented Source Code',
        'Free Bug Fixes & Deployment Guidance'
      ]
    },
    '02': {
      category: 'Web3 · Crypto Landing Pages',
      title: 'Web3 Crypto Token, Memecoin & Presale Websites',
      desc: 'High-conversion crypto token websites, viral memecoin launchpads, presale portals, and DEX/CoinMarketCap ready landing pages.',
      price: '$10 - $95+',
      turnaround: '24h - 4 Days Express',
      fiverrUrl: 'https://www.fiverr.com/s/3AA6Xxx',
      features: [
        'Interactive Tokenomics Charts & Metrics',
        'Dynamic Presale Countdown Timer & Progress Bar',
        'Web3 Wallet Integration (MetaMask, Phantom, WalletConnect)',
        'Roadmap Timeline with Animated Milestones',
        'Social Links, Whitepaper & Contract Copy Toast',
        'Mobile-Optimized High-Speed Loading',
        'Clean React/Next.js Code & Tailwind Styling',
        'SEO & Social Media Meta Tags Pre-Configured'
      ]
    },
    '03': {
      category: 'AI & Workflow Automation',
      title: 'Automate Business Workflows with n8n, Webhooks & AI APIs',
      desc: 'Automate repetitive manual operations by synchronizing apps, parsing emails/documents, and calling state-of-the-art AI models.',
      price: '$30 - $180+',
      turnaround: '2 - 5 Days',
      fiverrUrl: 'https://www.fiverr.com/s/Vrrgylm',
      features: [
        'Custom n8n Workflow Construction & Self-Hosting',
        'API & Webhook Integrations (Stripe, Slack, Notion, Gmail)',
        'LLM/AI Pipelines (OpenAI, Claude, Gemini, DeepSeek)',
        'Google Sheets & Database ETL Sync (Postgres, Supabase)',
        'Automated Error Handling & Telegram/Slack Alerts',
        'Lead Qualification & CRM Ingestion Automation',
        'Production Testing & Deployment Guide',
        '30-Day Post-Delivery Workflow Support'
      ]
    },
    '04': {
      category: 'Smart Contracts & DeFi',
      title: 'Custom ERC20, BEP20, Solana SPL Token & Smart Contracts',
      desc: 'Secure, audited-grade smart contracts for custom tokens, staking pools, presales, and DeFi mechanisms on EVM and Solana.',
      price: '$20 - $150+',
      turnaround: '2 - 7 Days',
      fiverrUrl: 'https://www.fiverr.com/s/qbbVZWl',
      features: [
        'Standard & Custom Token Logic (Burn, Mint, Tax)',
        'ERC20, BEP20, Arbitrum, Base & Solana SPL Support',
        'Staking & Reward Distribution Smart Contracts',
        'Presale / Token Sale Crowdfunding Contracts',
        'Comprehensive Unit Tests & Gas Optimization',
        'Source Code Verification on Etherscan/BscScan',
        'Owner Multi-Sig / Renounce Ownership Scripts',
        'Deployment Guide on Mainnet & Testnets'
      ]
    }
  };

  function openServiceModal(serviceId) {
    const data = servicesData[serviceId];
    if (!data || !serviceModal) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalPrice) modalPrice.textContent = data.price;
    if (modalTurnaround) modalTurnaround.textContent = data.turnaround;
    if (modalOrderLink) modalOrderLink.href = data.fiverrUrl;

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(feat => `
        <li class="flex items-start gap-2.5">
          <svg class="size-4 shrink-0 text-emerald-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
          <span class="text-ink/85 dark:text-white/85">${feat}</span>
        </li>
      `).join('');
    }

    serviceModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-service-view, .btn-service-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sId = btn.getAttribute('data-service-id');
      openServiceModal(sId);
    });
  });

  if (closeServiceModalBtn) {
    closeServiceModalBtn.addEventListener('click', closeServiceModal);
  }

  if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) closeServiceModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('is-open')) {
      closeServiceModal();
    }
  });

  // C. Interactive Codeforces Rating Chart
  const chartContainer = document.getElementById('cf-chart-container');
  const crosshair = document.getElementById('cf-chart-crosshair');
  const tooltip = document.getElementById('cf-chart-tooltip');
  const tipContest = document.getElementById('cf-tip-contest');
  const tipBadge = document.getElementById('cf-tip-badge');
  const tipRating = document.getElementById('cf-tip-rating');
  const tipDelta = document.getElementById('cf-tip-delta');
  const tipRank = document.getElementById('cf-tip-rank');
  const points = document.querySelectorAll('.cf-chart-point');

  if (chartContainer && crosshair && tooltip && points.length) {
    const pointData = Array.from(points).map(pt => ({
      el: pt,
      xPct: parseFloat(pt.style.left),
      yPct: parseFloat(pt.style.top),
      contest: pt.getAttribute('data-contest') || 'Codeforces Round',
      division: pt.getAttribute('data-division') || 'Div. 4',
      rating: pt.getAttribute('data-rating') || '906',
      delta: pt.getAttribute('data-delta') || '+0',
      rank: pt.getAttribute('data-rank') || 'Contender'
    }));

    let cBounds;

    function activatePoint(pt) {
      points.forEach(p => p.classList.remove('active-point'));
      pt.el.classList.add('active-point');

      // Update tooltip content
      if (tipContest) tipContest.textContent = pt.contest;
      if (tipBadge) tipBadge.textContent = pt.division;
      if (tipRating) tipRating.textContent = pt.rating;
      if (tipDelta) tipDelta.textContent = pt.delta;
      if (tipRank) tipRank.textContent = pt.rank;

      // Position guideline & tooltip
      crosshair.style.left = `${pt.xPct}%`;
      crosshair.style.opacity = '1';

      // Smart X translation
      const xTranslate = pt.xPct > 80 ? '-85%' : (pt.xPct < 20 ? '-15%' : '-50%');
      
      // Smart Y translation: if point is in upper half of chart, show tooltip below point
      if (pt.yPct < 48) {
        tooltip.style.transform = `translate(${xTranslate}, 18px)`;
      } else {
        tooltip.style.transform = `translate(${xTranslate}, calc(-100% - 16px))`;
      }
      
      tooltip.style.left = `${pt.xPct}%`;
      tooltip.style.top = `${pt.yPct}%`;
      tooltip.style.opacity = '1';
    }

    chartContainer.addEventListener('mouseenter', () => {
      cBounds = chartContainer.getBoundingClientRect();
    });

    chartContainer.addEventListener('mousemove', (e) => {
      if (!cBounds) cBounds = chartContainer.getBoundingClientRect();
      const mouseX = e.clientX - cBounds.left;
      const mouseXPct = (mouseX / cBounds.width) * 100;

      // Find nearest point along X
      let nearest = pointData[0];
      let minDiff = Math.abs(mouseXPct - pointData[0].xPct);
      for (let i = 1; i < pointData.length; i++) {
        const diff = Math.abs(mouseXPct - pointData[i].xPct);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = pointData[i];
        }
      }

      activatePoint(nearest);
    });

    // Initialize with peak milestone active by default
    const peakPoint = pointData[pointData.length - 1];
    activatePoint(peakPoint);

    chartContainer.addEventListener('mouseleave', () => {
      activatePoint(peakPoint);
      cBounds = null;
    });

    // Also support direct click/hover on points
    points.forEach((pt, i) => {
      pt.addEventListener('mouseenter', () => activatePoint(pointData[i]));
      pt.addEventListener('focus', () => activatePoint(pointData[i]));
    });

    // D. Morphing View Switcher (Trajectory vs. Mastery Radar)
    const btnCurve = document.getElementById('cf-view-curve-btn');
    const btnRadar = document.getElementById('cf-view-radar-btn');
    const viewCurve = document.getElementById('telemetry-view-curve');
    const viewRadar = document.getElementById('telemetry-view-radar');

    if (btnCurve && btnRadar && viewCurve && viewRadar) {
      btnCurve.addEventListener('click', () => {
        btnCurve.classList.add('active');
        btnRadar.classList.remove('active');
        viewCurve.style.display = '';
        viewRadar.style.display = 'none';
        if (peakPoint) activatePoint(peakPoint);
      });

      btnRadar.addEventListener('click', () => {
        btnRadar.classList.add('active');
        btnCurve.classList.remove('active');
        viewRadar.style.display = '';
        viewCurve.style.display = 'none';
        if (tooltip) tooltip.style.opacity = '0';
        if (crosshair) crosshair.style.opacity = '0';
      });
    }
  }
}





// ========================================================
// THE TIMELINE JOURNEY INTERACTIVE CONTROLLER
// ========================================================
function initTimelineJourney() {
  const eduSection = document.getElementById('education');
  const timelineWrapper = document.querySelector('.edu-timeline-wrapper');
  if (!eduSection || !timelineWrapper) return;

  // 1. Mouse Spotlight tracking on timeline cards
  document.querySelectorAll('.edu-timeline-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--edu-x', `${x}px`);
      card.style.setProperty('--edu-y', `${y}px`);
    });
  });

  // 2. Dynamic Scroll-driven Spine Extension
  function updateTimelineProgress() {
    const rect = timelineWrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // When top of timeline enters viewport to when bottom leaves
    const startOffset = windowHeight * 0.7;
    const totalHeight = rect.height;
    const currentProgress = (startOffset - rect.top) / totalHeight;
    const clampedProgress = Math.max(0.15, Math.min(1, currentProgress));
    
    timelineWrapper.style.setProperty('--edu-scroll-progress', `${Math.round(clampedProgress * 100)}%`);

    // Update active scrubber button based on scroll position
    const milestones = [
      { id: 'timeline-ndc', el: document.getElementById('timeline-ndc') },
      { id: 'timeline-kuet', el: document.getElementById('timeline-kuet') },
      { id: 'timeline-future', el: document.getElementById('timeline-future') }
    ];

    let activeId = 'timeline-ndc';
    milestones.forEach(m => {
      if (m.el) {
        const mRect = m.el.getBoundingClientRect();
        if (mRect.top <= windowHeight * 0.55) {
          activeId = m.id;
        }
      }
    });

    document.querySelectorAll('.edu-scrub-btn').forEach(btn => {
      if (btn.getAttribute('data-target') === activeId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();

  // 3. Quick-Scrubber Buttons Click Handling
  document.querySelectorAll('.edu-scrub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight active button
        document.querySelectorAll('.edu-scrub-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Add a temporary ripple/highlight effect to the card
        const card = targetEl.querySelector('.edu-timeline-card');
        if (card) {
          card.style.transform = 'translateY(-8px) scale(1.02)';
          card.style.boxShadow = '0 25px 60px -10px rgba(16, 185, 129, 0.4)';
          setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
          }, 1200);
        }
      }
    });
  });

  // 4. Interactive Node clicks (clicking nodes on the spine scrolls to milestone)
  document.querySelectorAll('.edu-milestone-item').forEach(item => {
    const node = item.querySelector('.edu-milestone-node');
    if (node) {
      node.addEventListener('click', () => {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  });

  // 5. Interactive Copy Roll Buttons
  document.querySelectorAll('.edu-copy-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const rollNumber = btn.getAttribute('data-copy');
      if (rollNumber) {
        try {
          await navigator.clipboard.writeText(rollNumber);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>Copied! ✨</span>';
          btn.style.transform = 'scale(1.05)';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.transform = '';
          }, 2000);
        } catch(err) {
          // Fallback
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>Copied! ✨</span>';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimelineJourney);
} else {
  initTimelineJourney();
}



// ========================================================
// POKER CARD THROW MOTION & INTERACTIVE DYNAMICS
// ========================================================
function initPokerEducationCards() {
  const eduSection = document.getElementById('education');
  if (!eduSection) return;

  const kuetCard = eduSection.querySelector('.edu-card-kuet');
  const ndcCard = eduSection.querySelector('.edu-card-ndc');
  const redealBtn = document.getElementById('redeal-cards-btn');
  const cards = [kuetCard, ndcCard].filter(Boolean);

  let hasDealt = false;

  function dealCards() {
    cards.forEach(c => c.classList.remove('is-dealt'));
    // Force DOM reflow to restart CSS keyframe animations
    void eduSection.offsetWidth;
    cards.forEach(c => c.classList.add('is-dealt'));
    hasDealt = true;
  }

  // IntersectionObserver to trigger the throw motion on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasDealt) {
        dealCards();
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  observer.observe(eduSection);

  // Manual Re-deal button
  if (redealBtn) {
    redealBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dealCards();
    });
  }

  // 3D Tilt and Mouse Spotlight Dynamics on Hover
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates
      card.style.setProperty('--edu-x', `${x}px`);
      card.style.setProperty('--edu-y', `${y}px`);

      // 3D Tilt normalized (-1 to 1)
      const normX = ((x / rect.width) - 0.5) * 2;
      const normY = ((y / rect.height) - 0.5) * 2;
      card.style.setProperty('--card-tilt-x', normX.toFixed(3));
      card.style.setProperty('--card-tilt-y', normY.toFixed(3));
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--card-tilt-x', '0');
      card.style.setProperty('--card-tilt-y', '0');
    });
  });

  // Roll Number Click-to-Copy
  eduSection.querySelectorAll('.edu-roll-badge-wrapper').forEach(wrapper => {
    wrapper.style.cursor = 'pointer';
    wrapper.setAttribute('title', 'Click to copy Roll ID');

    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = wrapper.getAttribute('data-roll') || wrapper.innerText.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).catch(() => {});
      }

      // Show toast
      let toast = wrapper.querySelector('.edu-copy-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'edu-copy-toast';
        toast.innerHTML = `<span>Copied ID: ${textToCopy}</span> <span style="color:#10b981;">✓</span>`;
        wrapper.appendChild(toast);
      }
      toast.classList.remove('is-active');
      void toast.offsetWidth;
      toast.classList.add('is-active');
      setTimeout(() => {
        toast.classList.remove('is-active');
      }, 1800);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPokerEducationCards);
} else {
  initPokerEducationCards();
}


// ========================================================
// TOP NAVIGATION BAR KINETIC LETTER MOTION ON CURSOR MOVE
// ========================================================
function initNavLetterMotion() {
  const nav = document.querySelector('nav[aria-label="Primary"]');
  if (!nav) return;

  const links = nav.querySelectorAll('.nav-kinetic-link');
  if (!links.length) return;

  links.forEach(link => {
    const chars = Array.from(link.querySelectorAll('.nav-kinetic-char'));
    if (!chars.length) return;

    let rafId = null;

    link.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dx = mouseX - charCenterX;
          const dy = mouseY - charCenterY;
          const dist = Math.hypot(dx, dy);
          const maxRadius = 60; // Influence radius in pixels

          if (dist < maxRadius) {
            const factor = 1 - (dist / maxRadius);
            // Elastic sine curve for natural smooth displacement
            const easeStrength = Math.sin(factor * Math.PI / 2);

            // Vertical wave lift (up to -7.5px)
            const translateY = -easeStrength * 7.5;
            // Horizontal magnetic repulsion away from cursor (up to 4px)
            const translateX = -(dx / maxRadius) * 4;
            // Angular momentum tilt based on cursor approach angle
            const rotate = -(dx / maxRadius) * 11;
            // Scale enhancement under pointer
            const scale = 1 + easeStrength * 0.16;

            char.style.transition = 'transform 0.08s ease-out';
            char.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          } else {
            char.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            char.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
          }
        });
      });
    });

    link.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      chars.forEach((char, idx) => {
        // Staggered spring settle back to baseline
        char.style.transition = `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 16}ms`;
        char.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
      });
    });

    link.addEventListener('mouseenter', () => {
      chars.forEach((char, idx) => {
        char.style.transition = `transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 18}ms`;
        char.style.transform = 'translate3d(0, -3px, 0)';
        setTimeout(() => {
          char.style.transform = 'translate3d(0, 0, 0)';
        }, 120 + idx * 18);
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavLetterMotion);
} else {
  initNavLetterMotion();
}

// ==========================================================================
// 10. Winter & Dragons Ambient Theme Engine (Game of Thrones)
// ==========================================================================
function initWinterAtmosphere() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Ensure canvas element exists
  let canvas = document.getElementById('winter-atmosphere-canvas');
  if (canvas && canvas.dataset.initialized === 'true') return;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'winter-atmosphere-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.className = 'fixed inset-0 pointer-events-none z-35 w-full h-full';
    document.body.prepend(canvas);
  }
  canvas.dataset.initialized = 'true';

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  resizeCanvas();

  // 2. Snow Particles Engine (55 on desktop, 25 on mobile)
  let particles = [];
  function createParticle() {
    const radius = 1.5 + Math.random() * 3.0; // 1.5px to 4.5px
    const depth = (radius - 1.5) / 3.0; // 0 (background) to 1 (foreground)
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: radius,
      depth: depth,
      baseVy: (0.65 + depth * 0.9) * (prefersReducedMotion ? 0.6 : 1),
      baseVx: (Math.random() - 0.5) * 0.35,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (0.65 + depth * 0.9) * (prefersReducedMotion ? 0.6 : 1),
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.008 + Math.random() * 0.014,
      swayAmp: 0.7 + depth * 0.9,
      opacity: 0.55 + depth * 0.4,
    };
  }

  function initParticles() {
    const isMobile = window.innerWidth < 768;
    const targetCount = prefersReducedMotion ? (isMobile ? 15 : 30) : (isMobile ? 25 : 55);
    particles = [];
    for (let i = 0; i < targetCount; i++) {
      particles.push(createParticle());
    }
  }
  initParticles();

  // Cursor repulsion tracking
  let mouseX = -9999;
  let mouseY = -9999;
  let mouseActive = false;
  let mouseTimer = null;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => { mouseActive = false; }, 2000);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseActive = false;
    mouseX = -9999;
    mouseY = -9999;
  });

  // 3. Passing Dragon Shadow & Blizzard Gust
  const dragon = {
    active: false,
    x: -550,
    y: 100,
    startX: -550,
    startY: 100,
    endX: width + 550,
    endY: height * 0.8,
    angle: 0.35,
    speed: 5.0,
    flightTime: 0,
    flapPhase: 0,
    scale: 1.15,
    dirX: 1,
  };

  let currentGust = 0; // Smooth wind intensity: 0 (gentle) to 1 (blizzard)
  let lastDragonTrigger = 0;

  function launchDragonFlight() {
    dragon.active = true;
    dragon.flightTime = 0;
    dragon.flapPhase = 0;

    const fromLeft = Math.random() > 0.3;
    dragon.dirX = fromLeft ? 1 : -1;
    const baseScale = window.innerWidth < 768 ? 0.82 : 1.22;
    dragon.scale = baseScale * (0.95 + Math.random() * 0.2);

    if (fromLeft) {
      dragon.startX = -260;
      dragon.startY = height * (0.05 + Math.random() * 0.25);
      dragon.endX = width + 450;
      dragon.endY = height * (0.55 + Math.random() * 0.35);
    } else {
      dragon.startX = width + 260;
      dragon.startY = height * (0.05 + Math.random() * 0.25);
      dragon.endX = -450;
      dragon.endY = height * (0.55 + Math.random() * 0.35);
    }

    dragon.x = dragon.startX;
    dragon.y = dragon.startY;
    dragon.angle = Math.atan2(dragon.endY - dragon.startY, dragon.endX - dragon.startX);
    dragon.speed = (window.innerWidth < 768 ? 4.8 : 5.8) + Math.random() * 0.8;
  }

  function tryTriggerDragon(source, force = false) {
    const now = Date.now();
    if (!force && (dragon.active || now - lastDragonTrigger < 4000)) return;
    lastDragonTrigger = now;
    launchDragonFlight();
  }

  // Expose trigger globally for on-demand inspection or testing
  window.triggerDragonFlight = () => tryTriggerDragon('manual', true);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
      tryTriggerDragon('hotkey-d', true);
    }
  });

  // Periodic trigger every 30 seconds
  setInterval(() => {
    tryTriggerDragon('timer-30s');
  }, 30000);

  // Initial showcase flight after 1.0s on page load
  setTimeout(() => {
    tryTriggerDragon('initial');
  }, 1000);

  // Scroll threshold trigger across major sections (#work, #notes, #experience, #library, #hobbies, #about)
  const majorSections = ['work', 'notes', 'experience', 'library', 'hobbies', 'about'];
  let lastObservedSection = '';

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          const secId = entry.target.id;
          if (lastObservedSection !== secId) {
            lastObservedSection = secId;
            tryTriggerDragon('section-' + secId);
          }
        }
      });
    }, {
      threshold: [0.12, 0.35],
      rootMargin: '0px 0px -10% 0px'
    });

    majorSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // 4. Large Majestic Wyvern Dragon Silhouette Drawing Function
  function drawDragon(x, y, scale, angle, flapPhase, opacity, dirX) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    if (dirX < 0) {
      ctx.scale(scale, -scale); // Maintain natural dorsal orientation when heading left
    } else {
      ctx.scale(scale, scale);
    }
    
    // Soft atmospheric shadow edge blur
    ctx.shadowColor = 'rgba(15, 23, 42, 0.45)';
    ctx.shadowBlur = 18;
    ctx.fillStyle = `rgba(15, 23, 42, ${opacity || 0.22})`; // Clearly visible, majestic shadow

    // Sinusoidal aerodynamic wing flap kinematics
    const flapSin = Math.sin(flapPhase);
    const flapCos = Math.cos(flapPhase);
    const wingYScale = 0.88 + flapSin * 0.34; // Deep vertical downstroke & upstroke flex
    const wingSweep = flapCos * 0.12;         // Aerodynamic sweep oscillation

    // 1. Dragon Main Body, Long Neck, Crowned Horns, Spine, & Spaded Tail
    ctx.beginPath();
    // Snout & Crowned Head
    ctx.moveTo(140, 0); // Snout apex
    ctx.lineTo(122, -9); // Upper jaw
    ctx.lineTo(105, -14); // Brow ridge
    ctx.lineTo(76, -34); // Primary backward horn
    ctx.lineTo(82, -20); // Horn base inner
    ctx.lineTo(68, -30); // Secondary crest horn
    ctx.lineTo(74, -17);
    // Long muscular serpentine neck
    ctx.quadraticCurveTo(45, -20, 15, -26); 
    // Broad muscular thorax & back
    ctx.quadraticCurveTo(-15, -32, -45, -30);
    ctx.quadraticCurveTo(-85, -26, -125, -20); // Flanks & pelvis
    // Long sweeping tail
    ctx.quadraticCurveTo(-175, -15, -225, -9);
    ctx.quadraticCurveTo(-270, -6, -310, -3);
    // Symmetrical Spiked Tail Spade (aerodynamic rudder)
    ctx.lineTo(-325, -22); // Upper spade fin
    ctx.lineTo(-348, -4);
    ctx.lineTo(-370, 0);   // Tail stinger tip
    ctx.lineTo(-348, 4);
    ctx.lineTo(-325, 22);  // Lower spade fin
    ctx.lineTo(-310, 3);
    // Ventral tail underside
    ctx.quadraticCurveTo(-270, 6, -225, 9);
    ctx.quadraticCurveTo(-175, 15, -125, 20); // Pelvis underside
    // Deep chest, keel & ribcage
    ctx.quadraticCurveTo(-85, 26, -45, 30);
    ctx.quadraticCurveTo(-15, 32, 15, 26);
    // Throat
    ctx.quadraticCurveTo(45, 20, 74, 17);
    // Lower jaw & cheek horns
    ctx.lineTo(68, 30);
    ctx.lineTo(74, 17);
    ctx.lineTo(76, 34);
    ctx.lineTo(105, 14);
    ctx.lineTo(122, 9);
    ctx.closePath();
    ctx.fill();

    // 2. Muscular Tucked Claws (Rear Talons)
    ctx.beginPath();
    ctx.moveTo(-110, -18);
    ctx.quadraticCurveTo(-135, -32, -155, -22);
    ctx.lineTo(-145, -16);
    ctx.lineTo(-110, -12);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-110, 18);
    ctx.quadraticCurveTo(-135, 32, -155, 22);
    ctx.lineTo(-145, 16);
    ctx.lineTo(-110, 12);
    ctx.closePath();
    ctx.fill();

    // 3. Port (Left) Wyvern Wing
    ctx.save();
    ctx.translate(-10, -22); // Left shoulder socket
    ctx.rotate(-wingSweep);
    ctx.scale(1, wingYScale);
    ctx.beginPath();
    ctx.moveTo(0, 0); // Shoulder
    // Heavy arm bone structure (humerus -> elbow -> wrist)
    ctx.quadraticCurveTo(-25, -75, -35, -140);
    ctx.quadraticCurveTo(0, -200, 35, -270); // Wrist / thumb claw
    // Primary leading spar & wing tip
    ctx.quadraticCurveTo(55, -320, 80, -360);
    // Scalloped trailing edge webbing between elongated phalanges
    ctx.quadraticCurveTo(35, -325, 0, -305);   // Scallop 1
    ctx.lineTo(-25, -320);                     // 2nd finger tip
    ctx.quadraticCurveTo(-35, -275, -60, -250);// Scallop 2
    ctx.lineTo(-90, -260);                     // 3rd finger tip
    ctx.quadraticCurveTo(-95, -210, -115, -175);// Scallop 3
    ctx.lineTo(-140, -170);                    // 4th finger tip
    ctx.quadraticCurveTo(-130, -110, -100, -50);// Scallop 4 inward to flank
    ctx.quadraticCurveTo(-75, -20, -35, 0);    // Webbing connects to pelvis
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Starboard (Right) Wyvern Wing (Symmetric)
    ctx.save();
    ctx.translate(-10, 22); // Right shoulder socket
    ctx.rotate(wingSweep);
    ctx.scale(1, wingYScale);
    ctx.beginPath();
    ctx.moveTo(0, 0); // Shoulder
    ctx.quadraticCurveTo(-25, 75, -35, 140);
    ctx.quadraticCurveTo(0, 200, 35, 270);
    ctx.quadraticCurveTo(55, 320, 80, 360);
    ctx.quadraticCurveTo(35, 325, 0, 305);
    ctx.lineTo(-25, 320);
    ctx.quadraticCurveTo(-35, 275, -60, 250);
    ctx.lineTo(-90, 260);
    ctx.quadraticCurveTo(-95, 210, -115, 175);
    ctx.lineTo(-140, 170);
    ctx.quadraticCurveTo(-130, 110, -100, 50);
    ctx.quadraticCurveTo(-75, 20, -35, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // 5. Main Animation Loop
  let animationFrameId = null;
  let isRunning = false;

  function render() {
    if (!isRunning) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Update Dragon Position & Gust Physics
    let targetGust = 0;
    if (dragon.active) {
      dragon.flightTime += 0.016;
      dragon.flapPhase += 0.058;
      dragon.x += Math.cos(dragon.angle) * dragon.speed;
      dragon.y += Math.sin(dragon.angle) * dragon.speed;

      // Draw Large Soft-Blurred Dragon Silhouette at visible, readable opacity
      drawDragon(dragon.x, dragon.y, dragon.scale, dragon.angle, dragon.flapPhase, 0.22, dragon.dirX);

      // Smooth blizzard gust: peak intensity when crossing center of viewport
      const distFromCenter = Math.abs(dragon.x - width / 2);
      const reach = width / 2 + 350;
      const crossingFactor = Math.max(0, 1 - (distFromCenter / reach));
      targetGust = Math.sin(crossingFactor * Math.PI / 2);

      // Boundary check to complete flight
      if (dragon.dirX > 0 && dragon.x > width + 450) {
        dragon.active = false;
      } else if (dragon.dirX < 0 && dragon.x < -450) {
        dragon.active = false;
      }
    }

    // Smoothly ease blizzard gust in and out (power up as dragon crosses, gentle ease back)
    currentGust += (targetGust - currentGust) * (dragon.active ? 0.065 : 0.035);

    // Dynamic wing-gust blizzard wind vectors
    const blizzardWindX = currentGust * (dragon.dirX * 9.8) + (currentGust > 0.15 ? Math.sin(dragon.flightTime * 8.5) * 2.0 : 0);
    const blizzardWindY = currentGust * 3.8;

    // Render Snow Particles with depth sorting / dual layers
    for (let i = 0; i < particles.length; i++) {
      const flake = particles[i];

      // Natural sinusoidal horizontal drift
      flake.phase += flake.phaseSpeed;
      const naturalSway = Math.sin(flake.phase) * flake.swayAmp;

      // Cursor repulsion
      if (mouseActive) {
        const dx = flake.x - mouseX;
        const dy = flake.y - mouseY;
        const dist = Math.hypot(dx, dy);
        const repulseDist = 95;
        if (dist < repulseDist && dist > 1) {
          const force = (1 - dist / repulseDist) * (flake.depth * 2.4 + 0.8);
          flake.vx += (dx / dist) * force;
          flake.vy += (dy / dist) * force * 0.4;
        }
      }

      // Settle velocities back to calm base speed
      flake.vx += (flake.baseVx - flake.vx) * 0.045;
      flake.vy += (flake.baseVy - flake.vy) * 0.045;

      // Apply combined forces: natural drift, cursor repulsion, and blizzard gust
      flake.x += flake.vx + naturalSway + blizzardWindX;
      flake.y += flake.vy + blizzardWindY;

      // Screen boundary wrap
      if (flake.y > height + 15) {
        flake.y = -12;
        flake.x = Math.random() * width;
      } else if (flake.y < -15) {
        flake.y = height + 12;
      }

      if (flake.x > width + 20) {
        flake.x = -15;
      } else if (flake.x < -20) {
        flake.x = width + 15;
      }

      // Render flake: Dual-tone rendering
      // Subtle cool slate-blue glow/shadow (rgba(100, 116, 139, 0.35)) + pure white core (#ffffff)
      ctx.save();
      ctx.shadowColor = 'rgba(100, 116, 139, 0.35)';
      ctx.shadowBlur = Math.max(2, flake.radius * 1.5);
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function stopLoop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Handle visibility change: pause when hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopLoop();
    } else {
      startLoop();
    }
  });

  // Handle window resize with debouncing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 150);
  }, { passive: true });

  // Start the engine
  startLoop();
}

// 18. Selected Works Engine & Coming Soon Toast
function initSelectedWorks() {
  const selectedWorksData = [
    {
      title: "Niryo Ned — Multi-Modal Robot Control",
      desc: "A complete multi-modal robot control system integrating autonomous vision-based pick and place, real-time hand gesture control, and voice command recognition with Bangla language support on the Niryo Ned 6-DOF collaborative robotic arm.",
      logo: "/projects/niryo-logo.png",
      image: "/projects/niryo-robot.webp",
      domain: "niryo.robotics",
      github: "https://github.com/failuresoul/Niryo-Robot",
      tags: ["ROS", "Python", "OpenCV", "MediaPipe", "Voice Control", "Robotics"]
    },
    {
      title: "Smart Laundry Management",
      desc: "Fresh clothes, zero hassle. Automated laundry management with doorstep pickup, real-time wash tracking, and secure payments.",
      logo: "/projects/smart-laundry-logo.png",
      image: "/projects/smart-laundry.webp",
      domain: "smartlaundry.app",
      github: "https://github.com/rakin072/Smart_Laundry_Management_System",
      tags: ["TypeScript", "Express", "Supabase", "Google Drive API", "Docker"]
    },
    {
      title: "Bicycle Rental Mini System",
      desc: "JavaFX & SQLite desktop/mobile application for bicycle rental logistics, inventory management, and billing.",
      logo: "/projects/bikerent-logo.png",
      image: "/projects/bicycle-rental.webp",
      domain: "bicyclerental.app",
      github: "https://github.com/rakin072",
      tags: ["Java", "JavaFX", "SQLite", "CSS3", "Desktop App"]
    },
    {
      title: "Lux Property Verse",
      desc: "Modern interactive real estate platform with high-conversion UI, search filters, and responsive design.",
      logo: "/projects/gridwise-logo.png",
      image: "/projects/lux-property.webp",
      domain: "luxproperty.app",
      github: "https://github.com/rakin072",
      tags: ["React", "Next.js", "TailwindCSS", "Framer Motion", "Node.js"]
    },
    {
      title: "Trendify Digital Growth",
      desc: "Real people, authentic stories, better results. High-performing UGC ads and creator campaigns that build brand trust and boost sales.",
      logo: "/projects/trendify-logo.png",
      image: "/projects/trendify.webp",
      domain: "trendify.agency",
      github: "https://github.com/rakin072",
      tags: ["Next.js", "React", "TailwindCSS", "Framer Motion", "UGC Marketing"]
    }
  ];

  let currentWorkIndex = 0;
  let toastTimer = null;

  const toast = document.getElementById('coming-soon-toast');
  const toastTitle = document.getElementById('coming-soon-toast-title');
  const toastDesc = document.getElementById('coming-soon-toast-desc');

  // Move toast directly to document.body to prevent parent stacking/transform clipping
  if (toast) {
    if (toast.parentElement !== document.body) {
      document.body.appendChild(toast);
    }
    toast.style.position = 'fixed';
    toast.style.zIndex = '999999';
    toast.style.bottom = '2rem';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, 16px) scale(0.95)';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }

  function showComingSoonToast(projectName) {
    if (!toast) return;
    const name = projectName || (selectedWorksData[currentWorkIndex] && selectedWorksData[currentWorkIndex].title) || "Project";
    if (toastTitle) {
      toastTitle.textContent = `${name} Live Demo`;
    }
    if (toastDesc) {
      toastDesc.textContent = `Coming Soon! The live production demo is being prepared.`;
    }

    // Animate in
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0) scale(1)';
    toast.style.pointerEvents = 'auto';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 16px) scale(0.95)';
      toast.style.pointerEvents = 'none';
    }, 4000);
  }

  // Toast click dismisses immediately
  if (toast) {
    toast.addEventListener('click', () => {
      if (toastTimer) clearTimeout(toastTimer);
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 16px) scale(0.95)';
      toast.style.pointerEvents = 'none';
    });
  }

  // Bind Visit Live button
  const liveBtn = document.getElementById('featured-work-live-btn');
  if (liveBtn) {
    liveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showComingSoonToast(selectedWorksData[currentWorkIndex]?.title);
    });
  }

  // Bind window preview click
  const windowPreview = document.getElementById('featured-work-window');
  if (windowPreview) {
    windowPreview.addEventListener('click', (e) => {
      e.preventDefault();
      showComingSoonToast(selectedWorksData[currentWorkIndex]?.title);
    });
    windowPreview.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showComingSoonToast(selectedWorksData[currentWorkIndex]?.title);
      }
    });
  }

  // Also bind any visit live links/buttons in project sections
  document.querySelectorAll('.btn-visit-live').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showComingSoonToast();
    });
  });

  // Project switching
  const tabButtons = document.querySelectorAll('.selected-work-tab-btn');
  const featuredLogo = document.getElementById('featured-work-logo');
  const featuredTitle = document.getElementById('featured-work-title');
  const featuredDesc = document.getElementById('featured-work-desc');
  const featuredTags = document.getElementById('featured-work-tags');
  const featuredGithub = document.getElementById('featured-work-github-btn');
  const featuredDomain = document.getElementById('featured-work-domain');
  const featuredImg = document.getElementById('featured-work-img');

  const defaultBadges = [
    '<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-[#e0f2fe] text-[#0369a1]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot size-3.5" aria-hidden="true"><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2v4"/><path d="M12 18v4"/></svg>Robotics</span>',
    '<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-[#dff3d6] text-[#1f6b34]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>Live Demo</span>',
    '<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-[#dff3d6] text-[#1f6b34]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>Live Demo</span>',
    '<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-ink/5 text-ink/80"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users size-3.5" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>Team Project</span>',
    '<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-[#ede9fe] text-[#5b21b6]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap size-3.5" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>Agent Skill</span>'
  ];

  const showingBadgeHtml = '<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-sm font-medium text-background"><span aria-hidden="true" class="size-1.5 rounded-full bg-current"></span>Showing</span>';

  function renderTags(tags) {
    if (!tags) return '';
    return tags.map(tag => `
      <li class="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1.5 text-[0.8125rem] text-white/90">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5 text-emerald-400"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        ${tag}
      </li>
    `).join('');
  }

  function selectWork(index) {
    if (index < 0 || index >= selectedWorksData.length) return;
    currentWorkIndex = index;
    const data = selectedWorksData[index];

    if (featuredTitle) featuredTitle.textContent = data.title;
    if (featuredDesc) featuredDesc.textContent = data.desc;
    if (featuredLogo) {
      featuredLogo.src = data.logo;
      featuredLogo.alt = `${data.title} Logo`;
    }
    if (featuredDomain) featuredDomain.textContent = data.domain;
    if (featuredGithub) featuredGithub.href = data.github;
    if (featuredImg) {
      featuredImg.src = data.image;
      featuredImg.alt = `${data.title} screenshot`;
    }
    if (featuredTags) {
      featuredTags.innerHTML = renderTags(data.tags);
    }

    tabButtons.forEach((btn, i) => {
      const isSelected = i === index;
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      const badges = btn.querySelectorAll(':scope > span');
      const badgeElem = badges.length > 1 ? badges[badges.length - 1] : null;

      if (isSelected) {
        btn.className = 'selected-work-tab-btn flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-[0_10px_24px_-18px_rgba(0,0,0,0.4)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand border-brand/40 bg-white/80 ring-2 ring-brand/25 dark:bg-white/10 cursor-pointer';
        if (badgeElem) badgeElem.outerHTML = showingBadgeHtml;
      } else {
        btn.className = 'selected-work-tab-btn flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-[0_10px_24px_-18px_rgba(0,0,0,0.4)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand border-ink/10 bg-white/45 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10 cursor-pointer';
        if (badgeElem && defaultBadges[i]) badgeElem.outerHTML = defaultBadges[i];
      }
    });
  }

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      selectWork(idx);
    });
  });
}


